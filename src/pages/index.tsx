import Banner from '@/components/Banner';
import Header from '@/components/Header';
import ProductFeed from '@/components/ProductFeed';
import { ProductProps } from '@/types/ProductTypes';
import { NextPageContext } from 'next';
import Head from 'next/head';

const Home: React.FC<{ products: ProductProps[] }> = ({ products }) => {
	return (
		<div className='bg-gray-100'>
			<Head>
				<title>Amazon Clone</title>
				<meta
					name='description'
					content='Amazon Clone Project'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<link
					rel='icon'
					href='/amazon.ico'
					type='image/x-icon'
				/>
			</Head>
			<Header />
			<main className='max-w-screen-2xl mx-auto'>
				<Banner />

				<ProductFeed products={products} />
			</main>
		</div>
	);
};

export const getServerSideProps = async (context: NextPageContext) => {
	const products = await fetch('https://fakestoreapi.com/products').then(
		(res) => res.json()
	);
	return {
		props: {
			products,
		},
	};
};

export default Home;
