import { Provider } from 'react-redux';
import store from '@/store/store';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '@/styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<Provider store={store}>
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
				<Component {...pageProps} />
			</Provider>
		</SessionProvider>
	);
}
