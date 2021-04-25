import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import Router from 'next/router';
import { useRouter } from 'next/router';
import FlightCard from '../Favourites/flight-card';
import QueryCard from './query-card';

type QueriesListProps = {
	list: any | null;
};

const QueriesList: FC<QueriesListProps> = ({ list }) => {
	return (
		<div className='bg-white pb-10 px-4 rounded-md w-full flex-grow'>
			<div className='items-center flex flex-col justify-center'>
				<h2 className='text-2xl inset-0 pb-6 p-4'>Your last Queries</h2>
				<ul className='space-y-2'>
					{list.length == 0 && (
						<p>
							No searches yet, go search and add new ones to keep track of them!
						</p>
					)}
					{[...list].reverse().map(object => (
						<QueryCard key={object._id} object={object}></QueryCard>
					))}
				</ul>
			</div>
		</div>
	);
};

export default QueriesList;
