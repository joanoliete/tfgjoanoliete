import React, {
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useState,
} from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { useFormikContext } from 'formik';
import { DatePicker } from 'react-nice-dates';
import { CalendarIcon } from '../icons/others/calendar-icon';
import { enGB } from 'date-fns/locale';
import 'react-nice-dates/build/style.css';

const DatePickerFieldEdit: FC<any> = ({ name }) => {
	const formik = useFormikContext();
	const field = formik.getFieldProps(name);

	return (
		<DatePicker
			date={field.value ? new Date(field.value) : field.value}
			onDateChange={value => formik.setFieldValue(name, value)}
			locale={enGB}>
			{({ inputProps, focused }) => (
				<div className='flex '>
					<input
						className={
							'input' +
							(focused ? ' -focused' : '') +
							' pl-2 flex w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
						}
						{...inputProps}
					/>
				</div>
			)}
		</DatePicker>
	);
};

export default DatePickerFieldEdit;
