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
import { ExpandIcon } from '../icons/others/expand-icon';
import { FavouritesIcon } from '../icons/header/favourites-icon';
import { BuyIcon } from '../icons/header/buy-icon';
import { useSession } from 'next-auth/client';
import {
	ApolloError,
	ApolloQueryResult,
	useMutation,
} from '@apollo/react-hooks';
import { toast } from 'react-toastify';
//import { useHistory } from 'react-router-dom';
import {
	favourite_flights_by_user_find_all,
	user_favourite_flight_delete,
} from '../../gql/favourites.gql';

type FlightCardProps = {
	object: any | null;
};

const FlightCard: FC<FlightCardProps> = ({ object }) => {
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

	const onDelete = (url_reference: any, email: string) => {
		onClickDelete({
			variables: { url_reference: url_reference, email: email },
		});
	};

	return (
		<li
			className='text-sm font-normal hover:bg-gray-100 text-gray-700 border rounded-md border-b-0 shadow-md'
			key={object.url_reference}>
			<div className=' border-gray-200 py-4 align-baseline flex '>
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

				<button
					onClick={() => onDelete(object.url_reference, session.user.email)}
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
					<button className='px-4 py-2 pb-3 border border-gray-200 rounded-md'>
						<p>Detailed flight information</p>
					</button>
				</div>
				<div className='pb-1'>
					<button className='p-1  cursor-pointer border border-gray-900 rounded-md flex'>
						<a href={object.url_reference}>Book flight</a>
						<div className='pl-1'>
							<BuyIcon className='fill-current blue cursor-pointer p-0.5'></BuyIcon>
						</div>
					</button>
				</div>
			</div>
		</li>
	);
};

/**
 * Gets the graphql mutation to delete a favourite flight
 *
 * @param refetch Refetch profile query
const onClickDelete = (
	url_reference: string,
	email: string,
	refetch: ApolloQueryResult<any>
) => {
	//const history = useHistory();
	const [deleteCourseMutation, { loading: deleteLoading }] = useMutation(
		user_favourite_flight_delete,
		{
			variables: { email: email, url_reference: url_reference },
			onCompleted: () => {
				toast.success('Flight deleted');
				//history.push('Buscar que fa push history');
			},
			onError: (error: ApolloError) => {
				toast.error(error.message);
			},
		}
	);
	return { deleteCourseMutation, deleteLoading };
};
*/

export default FlightCard;
