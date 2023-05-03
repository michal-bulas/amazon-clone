import Stripe from 'stripe';

interface Product {
	image: string;
	quantity: number;
}

export interface OrderProps {
	id: string;
	amount: number;
	amountShipping: number;
	products: Product[];
	timestamp: number;
	items: Stripe.Checkout.Session[];
}
