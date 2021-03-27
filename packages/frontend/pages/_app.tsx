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
				{/* Proveidor de cerca agafant com a prop el searchPath*/}
				<div className='min-h-screen flex flex-col'>
					<Header />
					<Component {...pageProps} />
					<Footer />
				</div>
			</Provider>
		</>
	);
};
export default MyApp;
