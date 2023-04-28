import type { ProductProps } from '@/types/ProductTypes';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { cartActions } from '@/store/slices/cartSlice';
import Stars from './UI/Stars';

const Product = ({
	id,
	title,
	price,
	description,
	category,
	image,
	rating,
}: ProductProps) => {
	const dispatch = useDispatch();

	const addItemHandler = () => {
		const product = { id, title, price, description, category, image, rating };

		dispatch(cartActions.addToCart(product));
	};

	return (
		<div className='relative flex flex-col m-5 bg-white z-30 p-10'>
			<p className='absolute top-2 right-2 text-xs italic text-gray-400'>
				{category}
			</p>

			<Image
				src={image}
				alt='Product image'
				height={200}
				width={200}
				className='object-contain w-48 h-48 self-center'
			/>

			<h4 className='py-4'>{title}</h4>

			<Stars rate={rating.rate} />

			<p className='text-xs my-2 line-clamp-2'>{description}</p>

			<p className='mb-5'>${price.toFixed(2)}</p>

			<button
				onClick={addItemHandler}
				className='button mt-auto'
			>
				Add To Cart
			</button>
		</div>
	);
};

export default Product;
