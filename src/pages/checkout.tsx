import CheckoutProduct from '@/components/CheckoutProduct';
import Header from '@/components/Header';
import {
	selectCartQuantity,
	selectCartTotal,
	selectItems,
} from '@/store/slices/cartSlice';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.stripe_public_key as string);

const Checkout = () => {
	const items = useSelector(selectItems);
	const cartQuantity = useSelector(selectCartQuantity);
	const cartTotal = useSelector(selectCartTotal).toFixed(2);
	const { data: session } = useSession();

	const createCheckoutSession = async (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
		if (!session || !session.user || !session.user.email) {
			console.error('Session, user, or email is not available.');
			return;
		}

		const stripe = await stripePromise;

		if (!stripe) {
			console.error('Stripe is not available.');
			return;
		}

		const checkoutSession = await axios
			.post('/api/checkout-session', {
				items: items,
				email: session.user.email,
			})
			.catch(function (error) {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					// http.ClientRequest in node.js
					console.log(error.request);
				} else {
					// Something happened in setting up the request that triggered an Error
					console.log('Error', error.message);
				}
				console.log(error.config);
			});

		const result = await stripe.redirectToCheckout({
			sessionId: checkoutSession.data.id,
		});
	};

	return (
		<div className='bg-gray-100'>
			<Header />
			<main className='lg:flex max-w-screen-2xl mx-auto'>
				<div className='flex-grow m-5 shadow-sm'>
					<Image
						width={1020}
						height={250}
						src='/bannerCheckout.jpg'
						alt='Checkout Image'
						className='object-contain w-full'
					/>
					<div className='flex flex-col p-5 space-y-10 bg-white shadow-md'>
						<h1 className='text-3xl border-b pb-4'>
							{items.length === 0 ? 'Your Cart is Empty' : 'Your Shopping Cart'}
						</h1>
						{items.map((item, index) => (
							<CheckoutProduct
								key={index}
								{...item}
							/>
						))}
					</div>
				</div>
				{items.length > 0 && (
					<div className='flex flex-col bg-white p-10 lg:mb-5 shadow-md'>
						<h2 className='whitespace-nowrap'>
							Subtotal ({cartQuantity} items):
							<span className='font-bold'> ${cartTotal}</span>
						</h2>
						<form
							action='/api/checkout_sessions'
							method='POST'
						>
							<button
								role='link'
								onClick={createCheckoutSession}
								disabled={!session}
								className={`button mt-2 ${
									!session &&
									'from-gray-300 to gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
								}`}
							>
								{!session ? 'Sign in to checkout' : 'Proceed to checkout'}
							</button>
						</form>
					</div>
				)}
			</main>
		</div>
	);
};

export default Checkout;
