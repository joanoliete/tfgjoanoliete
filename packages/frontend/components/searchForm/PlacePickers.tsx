import React, {
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useState,
} from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { LocationFromIcon } from '../icons/others/location-from-icon';
import { LocationToIcon } from '../icons/others/location-to-icon';
import { Location } from '././../../searchContext/searchContextTypes';
import { SearchContext } from '../../searchContext';
import { AutoComplete } from 'antd';

const PlacePickers: FC<any> = ({}) => {
	const { travelFrom, travelTo, setTravelFrom, setTravelTo } = useContext(
		SearchContext
	);
	//Fer crida o agafar del JSON tots els aeroports
	const options = [
		{ value: 'Utirik Airport', a: 'AUT' },
		{ value: 'Five Finger CG Heliport' },
		{ value: 'False Island Seaplane Base' },
	];

	return (
		<div className='flex flex-wrap pr-4 justify-center'>
			<div className='flex justify-center sm:py-4 sm:pl-4 pl-0'>
				<div className='bg-white border rounded-md px-2 py-3 border-gray-400 text-base text-gray-900 flex'>
					<span className='flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600'>
						<LocationFromIcon className='fill-current text-gray-800' />
					</span>
					<AutoComplete
						onChange={e =>
							setTravelFrom({
								id: '',
								locationId: '',
								name: e,
								type: '',
							} as Location)
						}
						value={travelFrom.name}
						style={{ width: 200 }}
						options={options}
						placeholder='Travel from?'
						filterOption={(inputValue, option) =>
							option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
							-1
						}
					/>
				</div>
			</div>

			<div className='flex justify-center p-4'>
				<div className='bg-white border rounded-md px-2 py-3 border-gray-400 text-base text-gray-900 flex'>
					<span className='flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600'>
						<LocationToIcon className='fill-current text-gray-800' />
					</span>
					<AutoComplete
						onChange={e =>
							setTravelTo({
								id: '',
								locationId: '',
								name: e,
								type: '',
							} as Location)
						}
						value={travelTo.name}
						style={{ width: 200 }}
						placeholder='To?'
						options={options}
						filterOption={(inputValue, option) =>
							option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
							-1
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default PlacePickers;
