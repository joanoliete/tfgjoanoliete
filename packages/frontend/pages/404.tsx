import { FC, useContext, useEffect } from 'react';
import Head from '../components/utils/head';

const NotFound: FC = () => {
	return (
		<>
			<Head title='Page not found' noindex />
			<div className='container-sm my-auto px-1'>
				<div className='p-1_5 mt-2 bg-white text-center'>
					<h1 className='text-5xl font-semibold text-primary'>Error 404</h1>
					<p className=' text-white-dark dark:text-white'>Wrong path</p>
				</div>
			</div>
		</>
	);
};

export default NotFound;
