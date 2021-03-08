import withApollo from '../lib/apollo/apolloClient';
import React, { FC, useEffect, useState } from 'react';
import Head from '../components/utils/head';

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
