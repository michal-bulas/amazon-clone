import Header from '@/components/Header';
import Head from 'next/head';

export default function Home() {
	return (
		<>
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
			<main className='max-w-screen-2xl mx-auto'></main>
		</>
	);
}
