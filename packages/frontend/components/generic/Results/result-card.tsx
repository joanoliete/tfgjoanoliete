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

type ResultCardProps = {
	object: any | null;
};

const ResultCard: FC<ResultCardProps> = ({ object }) => {
	const favouriteArrayIds = [];
	const [session, loading] = useSession();
	const [isOn, setIsOn] = useState(false);

	const [onClickCreate, resultCreate] = useMutation(
		flight_create_and_user_addition,
		{
			refetchQueries: [
				{
					query: favourite_flights_by_user_find_all,
					variables: {
						email: session.user.email,
					},
				},
				{
					query: query_history_find_all_of_user,
					variables: {
						email: session.user.email,
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
						email: session.user.email,
					},
				},
				{
					query: query_history_find_all_of_user,
					variables: {
						email: session.user.email,
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
			<div className=' border-gray-200 py-5 align-baseline flex '>
				<div className='px-4 py-1 font-bold'>USD {object.price}</div>

				<div className='px-4 py-1 '>
					<img
						src={`${
							'https://images.kiwi.com/airlines/32/' +
							object.airlines[0] +
							'.png'
						}`}
						alt=''
					/>
				</div>

				<div className='px-4 py-1 hidden sm:block'>
					{new Date(object.utc_departure).toUTCString()}
				</div>

				<div className='px-4 py-1 hidden sm:block'>
					{new Date(object.utc_arrival).toUTCString()}
				</div>

				<div className='px-4 py-1 '>{object.flyFrom}</div>

				<div className='pl-4 py-1 '>{object.flyTo}</div>

				<div className='px-4 pl-10 py-1 '>Direct</div>

				{session && !favouriteArrayIds.includes(object.id) && (
					<button
						className='px-4 py-1'
						onClick={() => onClickAdd(session.user.email, object)}>
						<UnFavouritesIcon className=' fill-current red cursor-pointer' />
					</button>
				)}

				{session && favouriteArrayIds.includes(object.id) && (
					<button
						className='px-4 py-1'
						onClick={() => onClickRemove(session.user.email, object.id)}>
						<FavouritesIcon className=' fill-current red cursor-pointer' />
					</button>
				)}

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
						<a>Click here to buy</a>
						<div className='pl-1'>
							<BuyIcon className='fill-current blue cursor-pointer p-0.5'></BuyIcon>
						</div>
					</button>
				</div>
			</div>
		</li>
	);
};

export default ResultCard;
