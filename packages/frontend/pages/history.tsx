import { FC, useContext, useEffect } from 'react';
import Head from '../components/utils/head';

const History: FC = () => {
	return (
		<>
			<Head title='Page not found' noindex />
			<div className='container-sm my-auto px-1 pb-6 flex-grow'>
				<div className='p-1_5 mt-2 bg-white text-center'>
					<h1 className='text-2xl'>Searches history</h1>
				</div>
			</div>
		</>
	);
};

export default History;
