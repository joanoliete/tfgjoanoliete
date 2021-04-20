import { FC, useContext } from 'react';

const Loader: FC<any> = () => {
	return (
		<>
			<div className='my-auto px-1 pb-6 flex-grow'>
				<div className='bg-white pb-4 px-4 rounded-md w-full flex-grow'>
					<div className='items-center flex flex-col justify-center pt-4'>
						<h3>Loading!</h3>
					</div>
				</div>
			</div>
		</>
	);
};

export default Loader;
