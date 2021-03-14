import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { ExpandIcon } from '../icons/others/expand-icon';
import { FavouritesIcon } from '../icons/header/favourites-icon';

type FlightCardProps = {
	object: any | null;
};

const FlightCard: FC<FlightCardProps> = ({ object }) => {
	return (
		<li
			className='text-sm font-normal text-gray-700 border rounded-md border-b-0'
			key={object.url_reference}>
			<div className='hover:bg-gray-100 border-b border-gray-200 py-5 align-baseline flex shadow-md'>
				<div className='px-4 py-1 hidden sm:block'>USD {object.price}</div>

				<div className='px-8 py-1 hidden sm:block'>
					<img src='' alt='' />
				</div>

				<div className='px-4 py-1 hidden sm:block'>
					{new Date(object.date_from).toUTCString()}
				</div>

				<div className='px-4 py-1 lg:block '>
					{new Date(object.date_to).toUTCString()}
				</div>

				<div className='px-4 py-1 hidden sm:block'>{object.fly_from}</div>

				<div className='px-4 py-1 hidden sm:block'>{object.fly_to}</div>

				<div className='px-4 pl-10 py-1 hidden sm:block'>Direct</div>

				<div className='px-4 py-1'>
					<FavouritesIcon className=' fill-current blue cursor-pointer' />
				</div>

				<div className='px-4 py-1'>
					<ExpandIcon className=' fill-current blue cursor-pointer' />
				</div>
			</div>
		</li>
	);
};

export default FlightCard;
