import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
import DatePicker from './DatePicker';

const DatePickers: FC<any> = ({}) => {
	return (
		<>
			<DatePicker />
			{/*If multiway then show second datePikcer*/}
		</>
	);
};

export default DatePickers;
