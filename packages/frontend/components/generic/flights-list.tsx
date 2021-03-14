import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import Router from 'next/router';
import { useRouter } from 'next/router';
import FlightCard from './flight-card';

type FlightsListProps = {
	list: any | null;
};

const FlightsList: FC<FlightsListProps> = ({ list }) => {
	return (
		<div className='bg-white pb-4 px-4 rounded-md w-full'>
			<div className='items-center flex flex-col justify-center'>
				<h2 className='text-2xl inset-0 pb-6 p-4'>Your favourite flights</h2>
				<ul className='space-y-2'>
					{list.map(object => (
						<FlightCard object={object}></FlightCard>
					))}
				</ul>
			</div>
		</div>
	);
};

export default FlightsList;
