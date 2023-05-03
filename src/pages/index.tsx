import Banner from '@/components/Banner';
import Header from '@/components/Header';
import ProductFeed from '@/components/ProductFeed';
import { ProductProps } from '@/types/ProductProps';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
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

export default Home;

export const getServerSideProps = async (context: NextPageContext) => {
	const session = await getSession(context);
	const products = await fetch('https://fakestoreapi.com/products').then(
		(res) => res.json()
	);
	return {
		props: {
			products,
			session,
		},
	};
};
