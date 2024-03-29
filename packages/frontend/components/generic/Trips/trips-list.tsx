import React, {
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useState,
} from 'react';
import TripCard from './trip-card';
import { CreateIcon } from '../../icons/others/create-icon';
import CreateTripModal from './create-trip-modal';

type TripsListProps = {
	list: any | null;
};

const TripsList: FC<TripsListProps> = ({ list }) => {
	const [modal, setModal] = useState(false);

	const toggle = () => {
		setModal(!modal);
	};

	return (
		<>
			<CreateTripModal
				className='bg-gray-800 rounded-full font-bold inline-flex items-center text-white px-6 py-4 hover:bg-gray-700 text-xl'
				show={modal}
				onClose={toggle}></CreateTripModal>

			<div className='bg-white pb-12 rounded-md w-full flex-grow'>
				<div className='items-center flex flex-col justify-center pt-4'>
					<button
						onClick={() => toggle()}
						className='bg-gray-800 rounded-full font-bold inline-flex items-center text-white px-6 py-4 hover:bg-gray-700 text-xl '>
						<span>Create trip </span>
						<CreateIcon className='inline ml-2 fill-current white cursor-pointer ' />
					</button>

					<h2 className='text-2xl inset-0 pb-2 p-6'>Your trips</h2>
					{list.length == 0 && (
						<p className='pb-4'>
							No trips created, start adding new destinations
						</p>
					)}
					<ul className='space-y-2 sm:w-8/12 md:w-7/12 lg:w-6/12 w-10/12'>
						{list.map(object => (
							<TripCard key={object._id} object={object}></TripCard>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default TripsList;
