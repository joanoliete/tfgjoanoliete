import React, { FC, useState } from 'react';
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
	SearchContextProvider,
} from '../../frontend/searchContext/searchContext';
import { isMobile } from 'react-device-detect';
import dynamic from 'next/dynamic';
import './../styles/datepickerstyles.css';
import './../styles/placepickerstyles.css';

/**
 * Application entry point component
 */
const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
	const MenuMobile = dynamic(() => import('../components/menu/menu-mobile'), {
		ssr: false,
	});
	const searchContext = SearchContextProvider();

	return (
		<>
			<Provider session={pageProps.session}>
				<SearchContext.Provider value={searchContext}>
					{isMobile ? <MenuMobile /> : null}
					<div className='page bg-secondary' id='mobilemenuContent'>
						<div className='min-h-screen flex flex-col'>
							<Header />
							<Component {...pageProps} />
							<Footer />
						</div>
					</div>
				</SearchContext.Provider>
			</Provider>
			<ToastContainer />
		</>
	);
};
export default MyApp;
