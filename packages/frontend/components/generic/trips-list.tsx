import React, {
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useState,
} from 'react';
import TripCard from './trip-card';
import { CreateIcon } from '../icons/others/create-icon';
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

			<div className='bg-white pb-12 px-4 rounded-md w-full flex-grow'>
				<div className='items-center flex flex-col justify-center pt-4'>
					<button
						onClick={() => toggle()}
						className='bg-gray-800 rounded-full font-bold inline-flex items-center text-white px-6 py-4 hover:bg-gray-700 text-xl '>
						<span>Create trip </span>
						<CreateIcon className='inline ml-2 fill-current white cursor-pointer ' />
					</button>

					<h2 className='text-2xl inset-0 pb-6 p-6'>Your trips</h2>
					<ul className='space-y-2 w-5/12'>
						{list.map(object => (
							<TripCard object={object}></TripCard>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default TripsList;
