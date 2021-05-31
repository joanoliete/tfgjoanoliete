import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import Router from 'next/router';
import { useRouter } from 'next/router';
import FlightCard from './flight-card';
import { useSession } from 'next-auth/client';

type FlightsListProps = {
	list: any | null;
};

const FlightsList: FC<FlightsListProps> = ({ list }) => {
	const [session, loadingSession] = useSession();
	return (
		<div className='bg-white pb-4 px-4 rounded-md w-full flex-grow'>
			<div className='items-center flex flex-col justify-center'>
				<h2 className='text-2xl inset-0 pb-2 p-4'>Your favourite flights</h2>
				<p className='pb-4'>
					Hello <b>{session.user.email}</b>!
				</p>
				<ul className='space-y-2'>
					{list.length == 0 && (
						<p>
							No favourite flights yet, go search and add new ones to keep track
							of them!
						</p>
					)}
					{[...list].reverse().map(object => (
						<FlightCard key={object.id} object={object}></FlightCard>
					))}
				</ul>
			</div>
		</div>
	);
};

export default FlightsList;
