import CheckoutProduct from '@/components/CheckoutProduct';
import Header from '@/components/Header';
import { selectItems } from '@/store/slices/cartSlice';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useSelector } from 'react-redux';

const Checkout = () => {
	const items = useSelector(selectItems);
	const { data: session } = useSession();

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
							Subtotal ({items.length} items):
							<span></span>
						</h2>
						<button
							disabled={!session}
							className={`button mt-2 ${
								!session &&
								'from-gray-300 to gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
							}`}
						>
							{!session ? 'Sign in to checkout' : 'Proceed to checkout'}
						</button>
					</div>
				)}
			</main>
		</div>
	);
};

export default Checkout;
