import React, {
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useState,
} from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
import PlacePickers from './PlacePickers';
import DatePickers from './DatePickers';
import { getSession, useSession } from 'next-auth/client';
import SearchMode from './SearchMode';
import { SearchIcon } from '../icons/header/search-icon';

const SearchForm: FC<any> = ({ show }) => {
	const [session, loadingSession] = useSession();
	const onClick = () => show(true);

	return (
		<div className='bg-white px-4 w-full'>
			<div className='items-center flex flex-col justify-center'>
				<h2 className='text-2xl inset-0 pb-2 p-4'>Search flights</h2>
				{!loadingSession && !session ? (
					<>
						<p className='pb-4'>
							Login to track favourite flights and automatize search
						</p>
					</>
				) : null}
				<div className='text-sm font-normal text-gray-700 border rounded-lg border-b-0 shadow-lg items-center flex flex-col justify-center pb-6 px-2'>
					<SearchMode />
					<div className='flex flex-wrap justify-center pb-2 sm:pt-0 pt-3'>
						<PlacePickers />
						<DatePickers />
					</div>
					<div className='flex flex-wrap justify-center pb-2 '>
						{/*Little filters, currency, sort and budget*/}
					</div>
					<button
						onClick={() => onClick()}
						className='bg-gray-800 rounded-full font-bold inline-flex items-center text-white px-6 py-4 hover:bg-gray-700 text-xl '>
						<span>Search</span>
						<SearchIcon className='inline ml-2 fill-current white cursor-pointer' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default SearchForm;
