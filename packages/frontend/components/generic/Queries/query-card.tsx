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
import { DeleteIcon } from '../../icons/others/delete-icon';
import {
	query_history_find_all_of_user,
	user_history_query_delete,
} from '../../../gql/queries.gql';

type QueryCardProps = {
	object: any | null;
};

const QueryCard: FC<QueryCardProps> = ({ object }) => {
	const dateNow = new Date().getTime();
	const [session, loading] = useSession();
	const [isOn, setIsOn] = useState(false);
	const [onClickDelete, result] = useMutation(user_history_query_delete, {
		refetchQueries: [
			{
				query: query_history_find_all_of_user,
				variables: {
					email: session.user.email,
				},
			},
		],
	});

	const onDelete = (email: string, id: any) => {
		onClickDelete({
			variables: { email: email, queryId: id },
		});
		toast.success('Deleted search!');
	};

	return (
		<li
			className={`${
				dateNow < new Date(object.date_from).getTime()
					? ''
					: 'bg-red-300 hover:bg-red-200'
			} text-sm font-normal text-gray-700 border rounded-md border-b-0 shadow-md`}
			key={object.url_reference}>
			<div className=' border-gray-200 py-4 align-baseline flex '>
				<div className='px-4 py-1 font-bold'>Search</div>

				<div className='px-4 py-1 hidden sm:block'>
					Date from: {new Date(object.departure_date).toUTCString()}
				</div>

				<div className='px-4 py-1 '>Departure: {object.departure_ap}</div>

				<div className='pl-4 py-1 '>Arrival: {object.arrival_ap}</div>

				<button
					onClick={() => onDelete(session.user.email, object._id)}
					className='px-4 py-1'>
					<DeleteIcon className=' fill-current blue cursor-pointer' />
				</button>
			</div>
		</li>
	);
};

export default QueryCard;
