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
	useQuery,
} from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import {
	favourite_flights_by_user_find_all,
	flight_create_and_user_addition,
	user_favourite_flight_delete,
} from '../../../gql/favourites.gql';
import { UnFavouritesIcon } from '../../icons/header/unfavourites-icon';
import { query_history_find_all_of_user } from '../../../gql/queries.gql';
import { CreateIcon } from '../../icons/others/create-icon';
import { destination_find_all_of_user } from '../../../gql/trips.gql';

type ResultCardProps = {
	object: any | null;
};

const ResultCard: FC<ResultCardProps> = ({ object }) => {
	const favouriteArrayIds = [];
	const [session, loadingSession] = useSession();
	const [isOn, setIsOn] = useState(false);
	// const { data, loading } = getDestinations(session.user.email);
	let email = null;

	if (session) {
		email = session.user.email;
	}

	const [onClickCreate, resultCreate] = useMutation(
		flight_create_and_user_addition,
		{
			refetchQueries: [
				{
					query: favourite_flights_by_user_find_all,
					variables: {
						email: email,
					},
				},
				{
					query: query_history_find_all_of_user,
					variables: {
						email: email,
					},
				},
			],
		}
	);

	const [onClickDelete, resultDelete] = useMutation(
		user_favourite_flight_delete,
		{
			refetchQueries: [
				{
					query: favourite_flights_by_user_find_all,
					variables: {
						email: email,
					},
				},
				{
					query: query_history_find_all_of_user,
					variables: {
						email: email,
					},
				},
			],
		}
	);

	const onClickAdd = (email: string, flightData: any) => {
		onClickCreate({
			variables: { email: email, flightData: flightData },
		});
		toast.success('Flight added to favourites!');
	};

	const onClickRemove = (email: string, id: any) => {
		onClickDelete({
			variables: { email: email, id: id },
		});
		toast.success('Flight deleted from favourites!');
	};

	if (session) {
		const { data, loading } = useQuery(favourite_flights_by_user_find_all, {
			variables: {
				email: session.user.email,
			},
		});
		const favouriteFlightsList =
			data && !loading ? data.favourite_flights_by_user_find_all : null;

		if (favouriteFlightsList) {
			favouriteFlightsList.forEach(flight => {
				favouriteArrayIds.push(flight.id);
			});
		}
	}

	return (
		<li
			className='text-sm font-normal text-gray-700 border rounded-md border-b-0 shadow-md'
			key={object.id}>
			<div className=' border-gray-200 py-5 align-baseline flex'>
				<div className='pl-4 pr-3 py-1 font-bold'>USD {object.price}</div>

				<div className=' py-1 flex'>
					{object.airlines.map(image => {
						return (
							<img
								className='px-1'
								src={`${
									'https://images.kiwi.com/airlines/32/' + image + '.png'
								}`}
							/>
						);
					})}
				</div>

				<div className='px-4 py-1 hidden sm:block'>
					{new Date(object.utc_departure).toLocaleString()}
				</div>

				<div className='px-4 py-1 hidden sm:block'>
					{new Date(object.utc_arrival).toLocaleString()}
				</div>

				<div className='pl-4 py-1 '>
					{object.flyFrom}
					{' - '}
				</div>

				<div className=' pl-1 py-1 '> {object.flyTo}</div>

				<div className='px-4 pl-8 py-1 '>
					{object.route.length == 1
						? 'Direct'
						: object.route.length - 1 + ' Stops'}
				</div>

				{session && !favouriteArrayIds.includes(object.id) && (
					<button
						className='pl-2 py-1'
						onClick={() => onClickAdd(session.user.email, object)}>
						<UnFavouritesIcon className=' fill-current red cursor-pointer' />
					</button>
				)}

				{session && favouriteArrayIds.includes(object.id) && (
					<button
						className='pl-2 py-1'
						onClick={() => onClickRemove(session.user.email, object.id)}>
						<FavouritesIcon className=' fill-current red cursor-pointer' />
					</button>
				)}

				<button onClick={() => setIsOn(!isOn)} className='pr-3 pl-2 py-1'>
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
							<div className='px-4 py-2 pb-3 border border-gray-300 rounded-md flex'>
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

				<div className='pb-1'>
					<button className='p-1 pt-2 pl-2 cursor-pointer border border-gray-900 rounded-md flex hover:bg-gray-900 hover:text-white text-md font-bold'>
						<a>Book flight</a>
						<div className='pl-1'>
							<BuyIcon className='fill-current blue cursor-pointer '></BuyIcon>
						</div>
					</button>
				</div>
			</div>
		</li>
	);
};

const getDestinations = (email: string) => {
	if (email) {
		const { data, loading } = useQuery(destination_find_all_of_user, {
			variables: {
				email: email,
			},
		});

		return { data, loading };
	} else {
		return null;
	}
};

export default ResultCard;
