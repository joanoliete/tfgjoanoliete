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
import Loader from '../utils/loader';

type DestinationCardProps = {
	object: any | null;
};

const DestinationCard: FC<DestinationCardProps> = ({ object }) => {
	return (
		<li
			className='text-sm font-normal hover:bg-gray-100 text-gray-700 border rounded-md border-b-0 shadow-md'
			key={object._id}>
			<div className=' border-gray-200 py-4 align-baseline flex '>
				<div className='px-4 py-1 hidden sm:block'>{object.city}</div>
				<div className='px-4 py-1 hidden sm:block'>
					{new Date(object.arrival_date).toUTCString()}
				</div>

				{!object.flight_associated && <p>No flight associated</p>}
				{object.flight_associated && (
					<a
						target='_blank'
						href={object.flight_associated.url_reference}
						className='px-4 py-1 flex-inline bg-gray-800 rounded-xl font-bold items-center text-white  hover:bg-gray-700 '>
						Click to see associated flight
					</a>
				)}
			</div>
		</li>
	);
};

export default DestinationCard;
