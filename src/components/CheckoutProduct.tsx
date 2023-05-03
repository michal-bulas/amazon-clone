import type { ProductProps } from '@/types/ProductProps';
import Image from 'next/image';
import Stars from './UI/Stars';
import { useDispatch } from 'react-redux';
import { cartActions } from '@/store/slices/cartSlice';

const CheckoutProduct = ({
	id,
	title,
	price,
	description,
	category,
	image,
	rating,
	quantity,
}: ProductProps) => {
	const dispatch = useDispatch();

	const addItemHandler = () => {
		const product = {
			id,
			title,
			price,
			description,
			category,
			image,
			rating,
			quantity,
		};

		dispatch(cartActions.addToCart(product));
	};

	const decreaseItemQuantityHandler = () => {
		dispatch(cartActions.decreaseItemQuantity(id));
	};
	const removeItemHandler = () => {
		dispatch(cartActions.removeFromCart(id));
	};

	return (
		<div className='grid grid-cols-5'>
			<Image
				src={image}
				alt='Product Image'
				height={200}
				width={200}
				className='object-contain w-48 h-48 self-center'
			/>
			<div className='col-span-3 mx-5'>
				<p>{title}</p>

				<Stars rate={rating.rate} />

				<p className='text-xs my-2 line-clamp-3'>{description}</p>
				<p>${price.toFixed(2)}</p>
			</div>
			<div className='flex flex-col space-y-2 my-auto justify-self-end'>
				<button
					onClick={addItemHandler}
					className='button mt-auto'
				>
					+
				</button>
				<div className='p-2 text-xs text-center md:text-sm border border-yellow-300 rounded-sm'>
					{quantity}
				</div>
				<button
					onClick={decreaseItemQuantityHandler}
					className='button mt-auto'
				>
					−
				</button>
				<button
					onClick={removeItemHandler}
					className='button mt-auto'
				>
					Remove from Cart
				</button>
			</div>
		</div>
	);
};

export default CheckoutProduct;
