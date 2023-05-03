import type { ProductProps } from '@/types/ProductProps';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

interface CheckoutRequest extends NextApiRequest {
	body: {
		items: ProductProps[];
		email: string;
	};
}

function isStripeError(error: unknown): error is Stripe.StripeRawError {
	return (error as Stripe.StripeRawError).statusCode !== undefined;
}

// Connection to Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2022-11-15',
});

export default async function handler(
	req: CheckoutRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		try {
			const { items, email } = req.body;

			// Prepare Cart Items payload
			const transformedItems = items.map((item) => ({
				quantity: item.quantity,
				price_data: {
					currency: 'USD',
					unit_amount: item.price * 100,
					product_data: {
						name: item.title,
						description: item.description,
						images: [item.image],
					},
				},
			}));

			// Create session
			const session = await stripe.checkout.sessions.create({
				payment_method_types: ['card'],
				shipping_options: [
					{ shipping_rate: 'shr_1N3Cw8I8E37eOQfM9gMM3LeF' },
					{ shipping_rate: 'shr_1N2s6VI8E37eOQfMdsAb4xx4' },
				],
				shipping_address_collection: {
					allowed_countries: ['US', 'GB'],
				},
				line_items: transformedItems,
				mode: 'payment',
				success_url: `${req.headers.origin}/success`,
				cancel_url: `${req.headers.origin}/`,
				custom_text: {
					shipping_address: {
						message:
							'Enter Email like example: "test@test.com" and any characters for Address',
					},
					submit: {
						message:
							'Test Card: NUMBER: 4242 4242 4242 4242, DATE: Any future date, CVC: Any 3 digits',
					},
				},
				metadata: {
					email,
					products: JSON.stringify(
						items.map((item) => ({
							image: item.image,
							quantity: item.quantity,
						}))
					),
				},
			});

			res.status(200).json({ id: session.id });

			if (session.url) {
				res.redirect(303, session.url);
			} else {
				res.status(500).json({ message: 'Session URL not available' });
			}
		} catch (err) {
			if (isStripeError(err)) {
				res.status(err.statusCode || 500).json({ message: err.message });
			} else {
				res.status(500).json({ message: 'Internal Server Error' });
			}
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
