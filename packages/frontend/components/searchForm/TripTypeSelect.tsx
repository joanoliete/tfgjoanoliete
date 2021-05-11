import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { SearchContext } from '../../searchContext';
import { Select } from 'antd';
import { TRIP_TYPES } from '../../searchContext/searchContextTypes';
import { TripTypeIcon } from '../icons/others/triptype-icon';

const TripTypeSelect: FC<any> = ({}) => {
	const { Option } = Select;
	const { tripType, setTripType } = useContext(SearchContext);
	function onChange(value) {
		setTripType(value);
	}
	return (
		<div className='flex flex-wrap pr-4 justify-center'>
			<div className='flex justify-center sm:py-4 sm:pl-4 pl-0'>
				<div className='bg-white border rounded-md px-2 py-3 border-gray-400 text-base text-gray-900 flex'>
					<span className='flex items-center leading-normal bg-white px-1 border-0 rounded rounded-r-none text-2xl text-gray-600'>
						<TripTypeIcon className='fill-current text-gray-800' />
					</span>
					<Select
						defaultValue={tripType}
						showSearch
						style={{ width: 120, height: 25 }}
						optionFilterProp='children'
						onChange={onChange}
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}>
						<Option value={TRIP_TYPES.ONEWAY}>One Way</Option>
						<Option value={TRIP_TYPES.RETURN}>Round Trip</Option>
					</Select>
				</div>
			</div>
		</div>
	);
};

export default TripTypeSelect;
