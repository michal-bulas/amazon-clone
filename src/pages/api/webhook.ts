import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import * as admin from 'firebase-admin';
import Stripe from 'stripe';

interface Session {
	id: string;
	amount_total: number;
	total_details: {
		amount_shipping: number;
	};
	metadata: {
		email: string;
		products: string;
	};
}

// Secure connection to Firebase
const serviceAccount = require('/permissions.json');
const app = !admin.apps.length
	? admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
	  })
	: admin.app();

// Connection to Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2022-11-15',
});

const endpointSecret = process.env.STRIPE_SIGNING_SECRET as string;

const fulfillOrder = async (session: Session) => {
	return app
		.firestore()
		.collection('users')
		.doc(session.metadata.email)
		.collection('orders')
		.doc(session.id)
		.set({
			amount: session.amount_total / 100,
			amount_shipping: session.total_details.amount_shipping / 100,
			products: JSON.parse(session.metadata.products),
			timestamp: admin.firestore.FieldValue.serverTimestamp(),
		});
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const requestBuffer = await buffer(req);
		const payload = requestBuffer.toString();
		const sig = req.headers['stripe-signature'] as string;

		// Verify that even is from Stripe
		let event;

		try {
			event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
		} catch (err) {
			if (err instanceof Error) {
				return res.status(400).send(`Webhook error: ${err.message}`);
			} else {
				return res.status(400).send('An unknown error occurred');
			}
		}

		// Handle completed event
		if (event.type === 'checkout.session.completed') {
			const session = event.data.object as Session;

			// Finish the order
			return fulfillOrder(session)
				.then(() => res.status(200))
				.catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
		}
	}
}

export const config = {
	api: {
		bodyParser: false,
		externalResolver: true,
	},
};
