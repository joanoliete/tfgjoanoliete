import withApollo from '../lib/apollo/apolloClient';
import React, { FC, useEffect, useState } from 'react';
import Head from '../components/utils/head';
import SearchForm from '../components/searchForm/SearchForm';
import ResultsList from '../components/generic/Results/result-list';

/**
 * Index route
 */
const Index: FC = () => {
	const [showResults, setShowResults] = useState(false);
	return (
		<>
			<Head title='tfgjoanoliete' noindex />
			<div className='my-auto px-1 pb-6 flex-grow'>
				<SearchForm show={setShowResults} />
				{showResults ? <ResultsList /> : null}
				{/*Secció de cards amb destinacions més buscades i estadístiques del lloc*/}
			</div>
		</>
	);
};

export default withApollo({ ssr: false })(Index);
