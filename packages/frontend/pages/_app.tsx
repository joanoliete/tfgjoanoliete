import React, { FC } from 'react';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

/**
 * Application entry point component
 */
const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
	return <Component {...pageProps} />;
};

export default MyApp;
