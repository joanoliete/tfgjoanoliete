import withApollo from '../lib/apollo/apolloClient';
import React, { FC, useEffect, useState } from 'react';

/**
 * Index route
 */
const Index: FC = () => {
	return (
		<>
			<p>This is some text in a paragraph.</p>
		</>
	);
};

export default withApollo({ ssr: true })(Index);
