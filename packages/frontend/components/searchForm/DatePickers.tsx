import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
import DatePicker from './DatePicker';
import { SearchContext } from '../../searchContext';

const DatePickers: FC<any> = ({}) => {
	const { tripType } = useContext(SearchContext);
	return (
		<>
			<DatePicker oneway={tripType} />
			{/*If multiway then show second datePikcer*/}
		</>
	);
};

export default DatePickers;
