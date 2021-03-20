import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import TripCard from './trip-card';
import { CreateIcon } from '../icons/others/create-icon';

type TripsListProps = {
	list: any | null;
};

const TripsList: FC<TripsListProps> = ({ list }) => {
	return (
		<div className='bg-white pb-4 px-4 rounded-md w-full'>
			<div className='items-center flex flex-col justify-center pt-4'>
				{/*Afegir un onClick create trip, finestra emergent mirar llibreries?*/}
				<button className='bg-gray-800 rounded-full font-bold inline-flex items-center text-white px-6 py-4 hover:bg-gray-700 text-xl '>
					<span>Create trip </span>
					<CreateIcon className='inline ml-2 fill-current white cursor-pointer ' />
				</button>

				<h2 className='text-2xl inset-0 pb-6 p-6'>Your trips</h2>
				<ul className='space-y-2'>
					{list.map(object => (
						<TripCard object={object}></TripCard>
					))}
				</ul>
			</div>
		</div>
	);
};

export default TripsList;
