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
			<div className=' border-gray-200 py-2 align-baseline grid grid-cols-3 pr-3'>
				<div className='px-1 pl-2'>
					<div className=' py-1 font-bold'>{object.city}</div>
					{new Date(object.arrival_date).toLocaleDateString()}
				</div>

				{!object.flight_associated && (
					<p className='items-center py-1 col-span-3 pl-2'>
						No flight associated
					</p>
				)}
				{object.flight_associated && (
					<div className='flex px-2 py-1 col-span-3'>
						<FlightCard object={object.flight_associated} />
					</div>
				)}
			</div>
		</li>
	);
};

export default DestinationCard;
