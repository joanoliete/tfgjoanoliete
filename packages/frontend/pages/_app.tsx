import React, { FC } from 'react';
import type { AppProps } from 'next/app';
import Header from '../components/menu/header';
import Footer from '../components/menu/footer';
import 'tailwindcss/tailwind.css';
import { Provider } from 'next-auth/client';

/**
 * Application entry point component
 */
const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
			<Provider session={pageProps.session}>
				<Header />
				<Component {...pageProps} />
				<Footer />
			</Provider>
		</>
	);
};
export default MyApp;
