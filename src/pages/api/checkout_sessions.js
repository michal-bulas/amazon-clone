const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	const { items, email } = req.body;
	console.log(items);

	const transformedItems = items.map((item) => ({
		quantity: 1,
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

	if (req.method === 'POST') {
		try {
			const session = await stripe.checkout.sessions.create({
				payment_method_types: ['card'],
				shipping_options: [{ shipping_rate: 'shr_1N2s6VI8E37eOQfMdsAb4xx4' }],
				shipping_address_collection: {
					allowed_countries: ['US', 'GB'],
				},
				line_items: transformedItems,
				mode: 'payment',
				success_url: `${process.env.HOST}/success`,
				cancel_url: `${process.env.HOST}/checkout`,
				// success_url: `${req.headers.origin}/?success=true`,
				// cancel_url: `${req.headers.origin}/?canceled=true`,
				metadata: {
					email,
					images: JSON.stringify(items.map((item) => item.image)),
				},
			});
			res.status(200).json({ id: session.id });
			res.redirect(303, session.url);
		} catch (err) {
			res.status(err.statusCode || 500).json(err.message);
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
