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
	user_favourite_flight_delete,
} from '../../../gql/favourites.gql';
import { query_history_find_all_of_user } from '../../../gql/queries.gql';

type ResultCardProps = {
	object: any | null;
};

const ResultCard: FC<ResultCardProps> = ({ object }) => {
	const [session, loading] = useSession();
	const [isOn, setIsOn] = useState(false);

	if (session) {
		const { data, loading } = useQuery(query_history_find_all_of_user, {
			variables: {
				email: session.user.email,
			},
		});
		const favouriteFlightsList =
			data && !loading ? data.query_history_find_all_of_user : null;
	}
	return (
		<li
			className='text-sm font-normal text-gray-700 border rounded-md border-b-0 shadow-md'
			key={object.id}>
			<div className=' border-gray-200 py-5 align-baseline flex '>
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

				<div className='px-4 py-1 '>{object.flyFrom}</div>

				<div className='pl-4 py-1 '>{object.flyTo}</div>

				<div className='px-4 pl-10 py-1 '>Direct</div>

				{/* Si el id de l'objecte es troba dins de l'array de ids que l'usuari té a preferits 
				fillejar o no l'icona, i posar mutació onClick de afegir/borrar el vol de preferits*/}
				{session && (
					<button className='px-4 py-1'>
						<FavouritesIcon className=' fill-current blue cursor-pointer' />
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
