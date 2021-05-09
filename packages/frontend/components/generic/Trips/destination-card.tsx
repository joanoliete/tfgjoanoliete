import React, {
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useState,
} from 'react';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { ObjectId } from 'bson';
import Loader from '../../utils/loader';
import { DoubleRightArrowIcon } from '../../icons/others/double-right-arrow-icon';
import FlightCard from '../Favourites/flight-card';

type DestinationCardProps = {
	object: any | null;
};

const DestinationCard: FC<DestinationCardProps> = ({ object }) => {
	return (
		<li className='text-sm font-normal hover:bg-gray-100 text-gray-700 border rounded-md border-b-0 shadow-md'>
			<div className=' border-gray-200 py-4 align-baseline flex pr-3'>
				<div className='px-4 py-1'>{object.city}</div>
				<div className='px-4 py-1'>
					{new Date(object.arrival_date).toUTCString()}
				</div>

				{!object.flight_associated && (
					<p className='items-center py-1'>No flight associated</p>
				)}
				{object.flight_associated && (
					<a
						target='_blank'
						href={object.flight_associated}
						className='flex px-2 py-1 '>
						<FlightCard object={object.flight_associated} />
					</a>
				)}
			</div>
		</li>
	);
};

export default DestinationCard;
