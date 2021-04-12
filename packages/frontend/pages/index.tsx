import withApollo from '../lib/apollo/apolloClient';
import React, { FC, useEffect, useState } from 'react';
import Head from '../components/utils/head';
import SearchForm from '../components/searchForm/SearchForm';

/**
 * Index route
 */
const Index: FC = () => {
	return (
		<>
			<Head title='tfgjoanoliete' noindex />
			<div className='container-sm my-auto px-1 pb-6 flex-grow'>
				<SearchForm />
				{/*Llistat de la busqueda de vols*/}
				{/*Secció de cards amb destinacions més buscades o recomanacions*/}
			</div>
		</>
	);
};

export default withApollo({ ssr: false })(Index);
