import React, { FC, useContext, useEffect } from 'react';
import Loader from '../../utils/loader';
import ResultCard from './result-card';
import { SearchContext } from '../../../searchContext';
import { useSession } from 'next-auth/client';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { query_create_and_user_addition } from '../../../gql/queries.gql';

const ResultsList: FC = () => {
	const searchContext = useContext(SearchContext);
	const searchContextObject = {
		departure_ap: searchContext.travelFrom.name,
		arrival_ap: searchContext.travelTo.name,
		departure_date: searchContext.dateFrom,
	};
	const [session, loadingSession] = useSession();
	let email = null;

	if (session) {
		email = session.user.email;
	}

	const { data, loading } = useQuery(query_create_and_user_addition, {
		variables: {
			email: email,
			context: searchContextObject,
		},
	});
	const queryList =
		data && !loading ? data.query_create_and_user_addition : null;

	return queryList ? (
		<>
			<div className='bg-white pb-4 px-4 rounded-md w-full flex-grow pt-2'>
				<div className='items-center flex flex-col justify-center'>
					<h2 className='text-2xl inset-0 pb-6 p-4'>Search results</h2>
					{queryList.length != 0 && (
						<ul className='space-y-3'>
							{queryList.map(object => (
								<ResultCard object={object}></ResultCard>
							))}
						</ul>
					)}
				</div>
			</div>
		</>
	) : (
		<Loader />
	);
};

export default ResultsList;
