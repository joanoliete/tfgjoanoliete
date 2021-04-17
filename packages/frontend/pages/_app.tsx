import React, { FC } from 'react';
import type { AppProps } from 'next/app';
import Header from '../components/menu/header';
import Footer from '../components/menu/footer';
import 'tailwindcss/tailwind.css';
import { Provider } from 'next-auth/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	defaultState,
	SearchContext,
} from '../../frontend/searchContext/searchContext';
import './../styles/datepickerstyles.css';

/**
 * Application entry point component
 */
const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
			<Provider session={pageProps.session}>
				<SearchContext.Provider value={defaultState}>
					<div className='min-h-screen flex flex-col'>
						<Header />
						<Component {...pageProps} />
						<Footer />
					</div>
				</SearchContext.Provider>
			</Provider>
			<ToastContainer />
		</>
	);
};
export default MyApp;
