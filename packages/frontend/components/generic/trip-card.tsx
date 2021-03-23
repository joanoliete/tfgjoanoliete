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
import FlightCard from './flight-card';
import { useSession } from 'next-auth/client';
import { useMutation } from '@apollo/react-hooks';
import { DeleteIcon } from '../icons/others/delete-icon';
import { ExpandIcon } from '../icons/others/expand-icon';
import { trip_find_all_of_user, user_trip_delete } from '../../gql/trips.gql';
import { ObjectId } from 'bson';
import DestinationCard from './destination-card';
import { EditIcon } from '../icons/others/edit-icon';
import EditModal from './edit-modal';

type TripCardProps = {
	object: any | null;
};

const TripCard: FC<TripCardProps> = ({ object }) => {
	const [session, loading] = useSession();
	const [modal, setModal] = useState(false);
	const [isOn, setIsOn] = useState(false);
	const [onClickDelete, result] = useMutation(user_trip_delete, {
		refetchQueries: [
			{
				query: trip_find_all_of_user,
				variables: {
					email: session.user.email,
				},
			},
		],
	});

	const onDelete = (email: string, tripId: ObjectId) => {
		onClickDelete({
			variables: { email: email, tripId: tripId },
		});
	};

	const toggle = () => {
		setModal(!modal);
	};

	return (
		<>
			<EditModal
				className='bg-gray-800 rounded-full font-bold inline-flex items-center text-white px-6 py-4 hover:bg-gray-700 text-xl'
				show={modal}
				onClose={toggle}></EditModal>

			<li
				className='text-sm font-normal hover:bg-gray-100 text-gray-700 border rounded-md border-b-0 shadow-md'
				key={object._id}>
				<div className=' border-gray-200 py-4 align-baseline flex '>
					<div className='pl-2 py-1 hidden sm:block'>{object.id}</div>
					<div className='px-4 py-1 hidden sm:block'>{object.name}</div>

					<div className='px-4 py-1 hidden sm:block'>{object.description}</div>

					<button
						onClick={() => onDelete(session.user.email, object._id)}
						className='pl-2 py-1'>
						<DeleteIcon className=' fill-current blue cursor-pointer' />
					</button>

					<button
						onClick={() => {
							toggle();
						}}
						className='pl-3 py-1'>
						<EditIcon className=' fill-current blue cursor-pointer' />
					</button>

					<button onClick={() => setIsOn(!isOn)} className='px-2 pr-2 py-1'>
						<ExpandIcon className=' fill-current blue cursor-pointer ' />
					</button>
				</div>

				<div
					className={`${
						isOn ? 'block' : 'hidden'
					} px-4 py-2 items-center flex flex-col justify-center `}>
					<div className='pb-2'>
						{/* Botó de crear destinació?
					<ul className='space-y-2'>
						{object.destinations.map(object => (
							<DestinationCard object={object}></DestinationCard>
						))}
					</ul>
					*/}
					</div>
				</div>
			</li>
		</>
	);
};

export default TripCard;