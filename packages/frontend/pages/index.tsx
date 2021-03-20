import withApollo from '../lib/apollo/apolloClient';
import React, { FC, useEffect, useState } from 'react';
import Head from '../components/utils/head';
import FlightsList from '../components/generic/flights-list';
import Search from '../components/search/Search';

/**
 * Index route
 */
const Index: FC = () => {
	return (
		<>
			<Head title='tfgjoanoliete' noindex />
			<Search></Search>
		</>
	);
};

export default withApollo({ ssr: false })(Index);
