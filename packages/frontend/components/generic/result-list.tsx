import React, {
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import Router from 'next/router';
import { useRouter } from 'next/router';
import FlightCard from './flight-card';
import Loader from '../utils/loader';
import ResultCard from './result-card';
import { SearchContext } from '../../searchContext';

const ResultsList: FC = () => {
	const searchContext = useContext(SearchContext);
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);

	/*Posar aquest trós de codi en el backend pasant el l'estat de cerca del contextSearch i la sessio,
	per crear tambe un servei que crei a l'usuari un query search (wrappejar rest API i fer expand pagination)*/
	useEffect(() => {
		fetch(
			'https://tequila-api.kiwi.com/v2/search?fly_from=FRA&fly_to=PRG&date_from=01%2F04%2F2021&limit=20&apikey=4xdovHrJn2tw6M5SZA0CMssmZWi0t5ZZ'
		)
			.then(res => res.json())
			.then(
				result => {
					setIsLoaded(true);
					setItems(result.data);
				},

				error => {
					setIsLoaded(true);
					setError(error);
				}
			);
	}, []);

	if (error) {
		return <div>Error: {error.message}</div>;
	}
	return (
		<div className='bg-white pb-4 px-4 rounded-md w-full flex-grow'>
			<div className='items-center flex flex-col justify-center'>
				<h2 className='text-2xl inset-0 pb-6 p-4'>Search results</h2>
				{isLoaded && !error ? (
					<ul className='space-y-3'>
						{items.map(object => (
							<ResultCard object={object}></ResultCard>
						))}
					</ul>
				) : (
					<Loader />
				)}
			</div>
		</div>
	);
};

export default ResultsList;
