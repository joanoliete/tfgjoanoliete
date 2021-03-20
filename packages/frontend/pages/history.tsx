import { FC, useContext, useEffect } from 'react';
import Head from '../components/utils/head';

const History: FC = () => {
	return (
		<>
			<Head title='Page not found' noindex />
			<div className='container-sm my-auto px-1'>
				<div className='p-1_5 mt-2 bg-white text-center'>
					<h1 className='text-5xl font-semibold text-primary'>
						Searches history
					</h1>
				</div>
			</div>
		</>
	);
};

export default History;
