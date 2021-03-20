import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';

const SearchMode: FC<any> = ({}) => {
	return (
		<div className='bg-white pb-4 px-4 rounded-md w-full'>
			<div className='items-center flex flex-col justify-center'>
				<h2 className='text-2xl inset-0 pb-6 p-4'>SearchMode</h2>
			</div>
		</div>
	);
};

export default SearchMode;
