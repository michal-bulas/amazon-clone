import type { ProductProps } from '@/types/ProductTypes';
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

const Product = ({
	id,
	title,
	price,
	description,
	category,
	image,
	rating,
}: ProductProps) => {
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

			<div className='flex'>
				{Array(Math.round(rating.rate))
					.fill(Math.round(rating.rate))
					.map((_, index) => (
						<StarIcon
							key={index}
							className='h-5 text-yellow-500'
						/>
					))}
			</div>

			<p className='text-xs my-2 line-clamp-2'>{description}</p>

			<p className='mb-5'>${price}</p>

			<button className='button mt-auto '>Add To Cart</button>
		</div>
	);
};

export default Product;
