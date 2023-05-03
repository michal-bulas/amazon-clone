import Header from '@/components/Header';
import { NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Stripe from 'stripe';
import { collection, doc, orderBy, query, getDocs } from 'firebase/firestore';
import db from '../../firebase';
import moment from 'moment';
import Order from '@/components/Order';
import { OrderProps } from '@/types/OrderProps';

interface OrdersProps {
	orders: OrderProps[];
}

const Orders = ({ orders }: OrdersProps) => {
	const { data: session } = useSession();
	return (
		<div>
			<Header />
			<main className='max-w-screen-lg mx-auto p-10'>
				<h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>
					Your Orders
				</h1>

				{session ? (
					<h2>{orders?.length} Orders</h2>
				) : (
					<h2>Please sign in to see your orders</h2>
				)}

				<div className='mt- space-y-4'>
					{orders?.map((order) => (
						<Order
							key={order.id}
							{...order}
						/>
					))}
				</div>
			</main>
		</div>
	);
};

export default Orders;

export const getServerSideProps = async (context: NextPageContext) => {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
		apiVersion: '2022-11-15',
	});

	// User credentials
	const session = await getSession(context);

	// Guard
	if (!session || !session.user || !session.user.email) {
		return {
			props: {},
		};
	}

	// Firebase
	const userRef = doc(db, 'users', session.user.email);
	const ordersRef = collection(userRef, 'orders');
	const ordersQuery = query(ordersRef, orderBy('timestamp', 'desc'));

	const querySnapshot = await getDocs(ordersQuery);
	const stripeOrders = querySnapshot.docs.map(async (order) => ({
		id: order.id,
		amount: order.data().amount,
		amountShipping: order.data().amount_shipping,
		products: order.data().products,
		timestamp: moment(order.data().timestamp.toDate()).unix(),
		items: (
			await stripe.checkout.sessions.listLineItems(order.id, {
				limit: 100,
			})
		).data,
	}));

	// Stripe
	const orders = await Promise.all(stripeOrders);

	return { props: { orders, session } };
};
