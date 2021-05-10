import React, { Dispatch, FC, useState } from 'react';
import { useSession } from 'next-auth/client';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { DeleteIcon } from '../../icons/others/delete-icon';
import {
	query_history_find_all_of_user,
	user_history_query_delete,
} from '../../../gql/queries.gql';
import { SearchIcon } from '../../icons/header/search-icon';

type QueryCardProps = {
	object: any | null;
	selectedQueries?: any | null;
	setSelectedQueries?: any | null;
};

const QueryCard: FC<QueryCardProps> = ({
	object,
	selectedQueries,
	setSelectedQueries,
}) => {
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

	const updateSelectedQueries = id => {
		if (!selectedQueries.includes(id)) {
			if (selectedQueries.length >= 5) {
				toast.error('Already selected 5, unselect one!');
			} else {
				setSelectedQueries([...selectedQueries, id]);
			}
		} else {
			setSelectedQueries(selectedQueries.filter(query => query !== id));
		}
	};

	return (
		<li
			className={`${
				dateNow < new Date(object.departure_date).getTime()
					? ''
					: 'bg-red-300 hover:bg-red-200'
			} text-sm font-normal text-gray-700 border rounded-md border-b-0 shadow-md`}
			key={object.id}>
			<div className=' border-gray-200 py-4 align-baseline flex '>
				<div className='px-4 py-1 font-bold'>Search</div>

				<div className='px-4 py-1 hidden sm:block'>
					Date from:{' '}
					{new Date(object.departure_date).toLocaleString().split(',')[0]}
				</div>

				<div className='px-4 py-1 '>Departure: {object.departure_ap}</div>

				<div className='pl-4 py-1 pr-8'>Arrival: {object.arrival_ap}</div>

				{/* <button onClick={() => undefined} className=' py-1 pr-2'>
					<SearchIcon className=' fill-current blue cursor-pointer' />
				</button> */}

				<label className='flex justify-start items-start py-1 '>
					<div className='bg-white border-2 rounded border-gray-600 w-5 h-5 flex flex-shrink-0 justify-center items-center'>
						<input
							type='checkbox'
							className='checkbox opacity-0 absolute cursor-pointer '
							onChange={() => updateSelectedQueries(object._id)}
						/>
						<div className='check-icon hidden  text-white rounded-sm'>
							<svg
								className='fill-current  w-4 h-4 text-green-500 pointer-events-none'
								viewBox='0 0 20 20'>
								<path d='M0 11l2-2 5 5L18 3l2 2L7 18z' />
							</svg>
						</div>
					</div>
				</label>

				<button
					onClick={() => onDelete(session.user.email, object._id)}
					className='p-3 py-1'>
					<DeleteIcon className=' fill-current blue cursor-pointer' />
				</button>
			</div>
			<style>
				{`  .checkbox:checked + .check-icon {
                            display: flex;
                        }`}
			</style>
		</li>
	);
};

export default QueryCard;
