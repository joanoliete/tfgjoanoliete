import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';

const Search: FC<any> = ({}) => {
	return (
		<div className='bg-white pb-4 px-4 rounded-md w-full flex-grow'>
			<div className='items-center flex flex-col justify-center'>
				<h2 className='text-2xl inset-0 pb-6 p-4'>Search and book flights</h2>
			</div>
			{/*Component SearchForm*/}
		</div>
	);
};

export default Search;
