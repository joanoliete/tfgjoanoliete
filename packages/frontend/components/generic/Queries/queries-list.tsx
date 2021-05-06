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
import FlightCard from '../Favourites/flight-card';
import QueryCard from './query-card';
import { CreateIcon } from '../../icons/others/create-icon';
import { SearchIcon } from '../../icons/header/search-icon';
import { Divider } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { automatize_queries } from '../../../gql/queries.gql';
import AutomaticList from './automatic-list';

type QueriesListProps = {
	list: any | null;
};

const QueriesList: FC<QueriesListProps> = ({ list }) => {
	const [showAutomaticResults, setShowAutomaticResults] = useState(false);
	const [selectedQueries, setSelectedQueries] = useState([]);

	return (
		<div className='bg-white pb-10 px-4 rounded-md w-full flex-grow'>
			<div className='items-center flex flex-col justify-center'>
				<button
					onClick={() => setShowAutomaticResults(true)}
					className='bg-gray-800 rounded-full font-bold inline-flex items-center text-white px-6 py-4 hover:bg-gray-700 text-xl '>
					<span>Automatize search </span>
					<SearchIcon className='inline ml-2 fill-current white cursor-pointer ' />
				</button>

				{showAutomaticResults ? (
					<AutomaticList selectedQueries={selectedQueries} />
				) : null}

				<h2 className='text-2xl inset-0 pt-4 pb-2'>Your last Queries</h2>
				<h3 className=' inset-0 pb-4'>
					Select up to 5 available searches and automate the search!
				</h3>
				<ul className='space-y-2'>
					{list.length == 0 && (
						<p>
							No searches yet, go search and add new ones to keep track of them!
						</p>
					)}
					{[...list].reverse().map(object => (
						<QueryCard
							key={object._id}
							object={object}
							selectedQueries={selectedQueries}
							setSelectedQueries={setSelectedQueries}></QueryCard>
					))}
				</ul>
			</div>
		</div>
	);
};

export default QueriesList;
