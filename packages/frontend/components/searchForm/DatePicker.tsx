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
import { DatePicker } from 'react-nice-dates';
import { enGB } from 'date-fns/locale';
import 'react-nice-dates/build/style.css';
import { CalendarIcon } from '../icons/others/calendar-icon';

const DatePickers: FC<any> = ({}) => {
	const [date, setDate] = useState(new Date());
	const { dateFrom, dateTo, setDepartureDate, setReturnDate } = useContext(
		SearchContext
	);
	return (
		<>
			<div className='items-center flex justify-center pr-4'>
				<DatePicker date={date} onDateChange={setDate} locale={enGB}>
					{({ inputProps, focused }) => (
						<input
							className={
								'input' +
								(focused ? ' -focused' : '') +
								'bg-white border rounded-md px-2 py-3 border-gray-400 text-base text-gray-900 outline-none'
							}
							{...inputProps}
						/>
						//Icona de calendari
					)}
				</DatePicker>
			</div>
		</>
	);
};

export default DatePickers;
