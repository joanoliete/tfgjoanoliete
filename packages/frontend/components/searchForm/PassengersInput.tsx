import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { Select } from 'antd';
import { SearchContext } from '../../searchContext';
import { PassengerIcon } from '../icons/others/passanger-icon';

const PassangersInput: FC<any> = ({}) => {
	const { Option } = Select;
	const { adults, setAdults } = useContext(SearchContext);
	function onChange(value) {
		setAdults(value);
	}
	return (
		<div className='flex flex-wrap pr-4 justify-center'>
			<div className='flex justify-center sm:py-4 sm:pl-4 pl-0'>
				<div className='bg-white border rounded-md px-2 py-3 border-gray-400 text-base text-gray-900 flex'>
					<span className='flex items-center leading-normal bg-white px-1 border-0 rounded rounded-r-none text-2xl text-gray-600'>
						<PassengerIcon className='fill-current text-gray-800' />
					</span>
					<Select
						defaultValue={adults}
						showSearch
						style={{ width: 50, height: 25 }}
						optionFilterProp='children'
						onChange={onChange}
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}>
						<Option value={1}>1</Option>
						<Option value={2}>2</Option>
						<Option value={3}>3</Option>
						<Option value={4}>4</Option>
						<Option value={5}>5</Option>
					</Select>
				</div>
			</div>
		</div>
	);
};

export default PassangersInput;
