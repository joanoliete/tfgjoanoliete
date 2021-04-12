import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
import TripTypeSelect from './TripTypeSelect';
import PassangersInput from './PassengersInput';

const SearchMode: FC<any> = ({}) => {
	return (
		<div className='bg-white pb-4 px-4 rounded-md w-full'>
			<div className='items-center flex flex-col justify-center'>
				<div className='flex space-x-2 pt-4'>
					<TripTypeSelect />
					<PassangersInput />
					{/*Flight class select flight*/}
				</div>
			</div>
		</div>
	);
};

export default SearchMode;
