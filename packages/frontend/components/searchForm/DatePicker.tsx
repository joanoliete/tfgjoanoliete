import React, {
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useState,
} from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { SearchContext } from '../../searchContext/searchContext';
import { DatePicker, DateRangePicker } from 'react-nice-dates';
import { enGB } from 'date-fns/locale';
import 'react-nice-dates/build/style.css';
import { CalendarIcon } from '../icons/others/calendar-icon';
import { RightArrowIcon } from '../icons/others/rightarrow-icon';
import { TRIP_TYPES } from '../../searchContext/searchContextTypes';
import { LocationToIcon } from '../icons/others/location-to-icon';

type DatePickerProps = {
	oneway: string;
};

const DatePickers: FC<any> = ({ oneway }: DatePickerProps) => {
	const { dateFrom, dateTo, setDepartureDate, setReturnDate } = useContext(
		SearchContext
	);
	return (
		<>
			{oneway === (TRIP_TYPES.ONEWAY || TRIP_TYPES.RETURN) ? (
				<div className='items-center flex justify-center pr-4'>
					<DatePicker
						date={dateFrom}
						onDateChange={setDepartureDate}
						locale={enGB}>
						{({ inputProps, focused }) => (
							<div className='bg-white border rounded-md px-1 py-3 border-gray-400 text-base text-gray-900 flex'>
								<span className='flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600'>
									<CalendarIcon className='fill-current text-gray-800 ' />
								</span>
								<input
									className={
										'input' +
										(focused ? ' -focused' : '') +
										'focus:outline-none w-24'
									}
									{...inputProps}
								/>
							</div>
						)}
					</DatePicker>
				</div>
			) : (
				<div className='items-center flex justify-center space-x-2 sm:pr-4 '>
					<DateRangePicker
						startDate={dateFrom}
						endDate={dateTo}
						onStartDateChange={setDepartureDate}
						onEndDateChange={setReturnDate}
						locale={enGB}>
						{({ startDateInputProps, endDateInputProps, focus }) => (
							<div className='date-range flex space-x-1 items-center'>
								<div className='bg-white border rounded-md px-1 py-3 border-gray-400 text-base text-gray-900 flex'>
									<span className='flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600'>
										<CalendarIcon className='fill-current text-gray-800 ' />
									</span>
									<input
										className={
											'input' +
											(focus === 'startDate' ? ' -focused' : '') +
											' focus:outline-none w-24'
										}
										{...startDateInputProps}
										placeholder='Start date'
									/>
								</div>
								<RightArrowIcon className='fill-current text-gray-900'></RightArrowIcon>
								<div className='bg-white border rounded-md px-1 py-3 border-gray-400 text-base text-gray-900 flex'>
									<span className='flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600'>
										<CalendarIcon className='fill-current text-gray-800' />
									</span>
									<input
										className={
											'input' +
											(focus === 'endDate' ? ' -focused' : '') +
											' focus:outline-none w-24'
										}
										{...endDateInputProps}
										placeholder='End date'
									/>
								</div>
							</div>
						)}
					</DateRangePicker>
				</div>
			)}
		</>
	);
};

export default DatePickers;
