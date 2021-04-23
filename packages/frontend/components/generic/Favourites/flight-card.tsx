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
import { ExpandIcon } from '../../icons/others/expand-icon';
import { FavouritesIcon } from '../../icons/header/favourites-icon';
import { BuyIcon } from '../../icons/header/buy-icon';
import { useSession } from 'next-auth/client';
import {
	ApolloError,
	ApolloQueryResult,
	useMutation,
} from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import {
	favourite_flights_by_user_find_all,
	user_favourite_flight_delete,
} from '../../../gql/favourites.gql';
import { query_history_find_all_of_user } from '../../../gql/queries.gql';

type FlightCardProps = {
	object: any | null;
};

const FlightCard: FC<FlightCardProps> = ({ object }) => {
	const dateNow = new Date().getTime();
	const [session, loading] = useSession();
	const [isOn, setIsOn] = useState(false);
	const [onClickDelete, result] = useMutation(user_favourite_flight_delete, {
		refetchQueries: [
			{
				query: favourite_flights_by_user_find_all,
				variables: {
					email: session.user.email,
				},
			},
		],
	});

	const onDelete = (id: any, email: string) => {
		onClickDelete({
			variables: { id: id, email: email },
		});
		toast.success('Flight deleted!');
	};

	return (
		<li
			className={`${
				dateNow < new Date(object.utc_departure).getTime()
					? ''
					: 'bg-red-300 hover:bg-red-200'
			} text-sm font-normal text-gray-700 border rounded-md border-b-0 shadow-md`}
			key={object.id}>
			<div className=' border-gray-200 py-4 align-baseline flex '>
				<div className='px-4 py-1 font-bold'>USD {object.price}</div>

				<div className='px-4 py-1 '>
					<img src='' alt='' />
				</div>

				<div className='px-4 py-1 hidden sm:block'>
					{new Date(object.utc_departure).toUTCString()}
				</div>

				<div className='px-4 py-1 hidden sm:block'>
					{new Date(object.utc_arrival).toUTCString()}
				</div>

				<div className='px-4 py-1 '>{object.cityCodeFrom}</div>

				<div className='pl-4 py-1 '>{object.cityCodeTo}</div>

				<div className='px-4 pl-10 py-1 '>Direct</div>

				<button
					onClick={() => onDelete(object.id, session.user.email)}
					className='px-4 py-1'>
					<FavouritesIcon className=' fill-current blue cursor-pointer' />
				</button>

				<button onClick={() => setIsOn(!isOn)} className='px-4 py-1'>
					<ExpandIcon className=' fill-current blue cursor-pointer' />
				</button>
			</div>

			<div
				className={`${
					isOn ? 'block' : 'hidden'
				} px-4 py-2 items-center flex flex-col justify-center `}>
				<div className='pb-2'>
					<button className='px-4 py-2 pb-3 border border-gray-900 rounded-md'>
						<p>Detailed flight information</p>
					</button>
				</div>
				<div className='pb-1'>
					<button className='p-1  cursor-pointer border border-gray-900 rounded-md flex'>
						<a href={undefined}>Book flight</a>
						<div className='pl-1'>
							<BuyIcon className='fill-current blue cursor-pointer p-0.5'></BuyIcon>
						</div>
					</button>
				</div>
			</div>
		</li>
	);
};

export default FlightCard;
