import { ProductProps } from '@/types/ProductTypes';
import Product from './Product';

const ProductFeed: React.FC<{ products: ProductProps[] }> = ({ products }) => {
	return (
		<div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>
			{products
				.slice(0, 4)
				.map(({ id, title, price, description, category, image, rating }) => (
					<Product
						key={id}
						id={id}
						title={title}
						price={price}
						description={description}
						category={category}
						image={image}
						rating={rating}
					/>
				))}

			<img
				src='/bannerLarge.jpg'
				alt='Large Banner'
				className='md:col-span-full'
			/>

			<div className='md:col-span-2'>
				{products
					.slice(4, 5)
					.map(({ id, title, price, description, category, image, rating }) => (
						<Product
							key={id}
							id={id}
							title={title}
							price={price}
							description={description}
							category={category}
							image={image}
							rating={rating}
						/>
					))}
			</div>
			{products
				.slice(5, products.length)
				.map(({ id, title, price, description, category, image, rating }) => (
					<Product
						key={id}
						id={id}
						title={title}
						price={price}
						description={description}
						category={category}
						image={image}
						rating={rating}
					/>
				))}
		</div>
	);
};

export default ProductFeed;
