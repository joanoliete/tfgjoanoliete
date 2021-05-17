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
import { isMobile } from 'react-device-detect';
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

type DestinationFlightCardProps = {
	object: any | null;
};

const DestinationFlightCard: FC<DestinationFlightCardProps> = ({ object }) => {
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
			<div className=' border-gray-200 py-4 align-baseline flex'>
				<div className='pl-4 py-1 font-bold'>EUR {object.price}</div>

				<div className='px-4 py-1  hidden lg:flex'>
					{object.airlines.map(image => {
						return (
							<img
								className='px-1 object-contain'
								src={`${
									'https://images.kiwi.com/airlines/32/' + image + '.png'
								}`}
							/>
						);
					})}
				</div>

				<div className='px-2 py-1 hidden sm:block'>
					{new Date(object.utc_departure).toLocaleString()}
				</div>

				<div className='px-4 py-1 hidden sm:block'>
					{new Date(object.utc_arrival).toLocaleString()}
				</div>

				<div className='pl-4 py-1 '>
					{object.cityCodeFrom}
					{' - '}
					{object.cityCodeTo}
				</div>

				<div className='px-4 pl-3 py-1 '>
					{object.route.length == 1
						? 'Direct'
						: object.route.length - 1 + ' Stops'}
				</div>

				<button
					onClick={() => onDelete(object.id, session.user.email)}
					className='pl-2 py-1'>
					<FavouritesIcon className=' fill-current blue cursor-pointer' />
				</button>

				<button onClick={() => setIsOn(!isOn)} className='sm:px-4 pl-2 py-1'>
					<ExpandIcon className=' fill-current blue cursor-pointer' />
				</button>
			</div>

			<div
				className={`${
					isOn ? 'block' : 'hidden'
				} px-4 py-2 items-center flex flex-col justify-center `}>
				{object.route.map(route => {
					return (
						<div className='pb-2'>
							<div className='px-4 py-2 pb-3 border border-gray-300 rounded-md flex-col'>
								<p className='pr-1'>
									{new Date(route.utc_departure).toLocaleDateString()}
								</p>
								<p className='pr-1'>{route.airline}</p>

								<p className='pr-1'>{route.flight_no}</p>

								<p className='pr-1'>
									Depart at{' '}
									{new Date(route.utc_departure)
										.toLocaleTimeString()
										.slice(0, 5)}{' '}
									from {route.cityFrom}
								</p>

								<p className='pr-1'>
									Fly for{' '}
									{(
										(new Date(route.utc_arrival).getTime() -
											new Date(route.utc_departure).getTime()) /
										1000 /
										60 /
										60
									).toPrecision(2)}{' '}
									hours
								</p>
								<p>
									Arrival {route.cityTo} at{' '}
									{new Date(route.utc_arrival).toLocaleTimeString().slice(0, 5)}
								</p>
							</div>
						</div>
					);
				})}

				<a href={object.deep_link} target='_blank' className='pb-1'>
					<button className='p-1 pt-2 pl-2 cursor-pointer border border-gray-900 rounded-md flex hover:bg-gray-900 hover:text-white text-md font-bold'>
						<a>Book flight</a>
						<div className='pl-1'>
							<BuyIcon className='fill-current blue cursor-pointer '></BuyIcon>
						</div>
					</button>
				</a>
			</div>
		</li>
	);
};

export default DestinationFlightCard;
