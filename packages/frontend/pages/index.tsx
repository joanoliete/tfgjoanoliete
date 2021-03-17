import withApollo from '../lib/apollo/apolloClient';
import React, { FC, useEffect, useState } from 'react';
import Head from '../components/utils/head';
import FlightsList from '../components/generic/flights-list';

/**
 * Index route
 */
const Index: FC = () => {
	return (
		<>
			<Head title='tfgjoanoliete' noindex />
			<p>This is some text in a paragraph.</p>
		</>
	);
};

export default withApollo({ ssr: true })(Index);
