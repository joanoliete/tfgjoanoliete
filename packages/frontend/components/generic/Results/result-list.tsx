import React, { FC, useContext, useEffect, useState } from 'react';
import Loader from '../../utils/loader';
import ResultCard from './result-card';
import { SearchContext } from '../../../searchContext';
import { useSession } from 'next-auth/client';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { query_create_and_user_addition } from '../../../gql/queries.gql';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { isMobile } from 'react-device-detect';

const ResultsList: FC = () => {
	const searchContext = useContext(SearchContext);
	const searchContextObject = {
		departure_ap: searchContext.travelFrom.locationId,
		arrival_ap: searchContext.travelTo.locationId,
		departure_date: searchContext.dateFrom,
		adults: searchContext.adults,
	};
	const [session, loadingSession] = useSession();

	let email = 'none';

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
			<div className='bg-white pb-8 px-4 rounded-md w-full flex-grow pt-2'>
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
		<>
			<div className='bg-white pb-4 px-4 rounded-md w-full flex-grow pt-2'>
				<div className='items-center flex flex-col justify-center'>
					<h2 className='text-2xl  pb-6 p-4 justify-center '>Searching</h2>

					{!isMobile ? (
						<>
							<Skeleton duration={2} height={75} width='700px' />
							<Skeleton duration={2} height={75} width='700px' />
							<Skeleton duration={2} height={75} width='700px' />
							<Skeleton duration={2} height={75} width='700px' />
							<Skeleton duration={2} height={75} width='700px' />
							<Skeleton duration={2} height={75} width='700px' />
							<Skeleton duration={2} height={75} width='700px' />
							<Skeleton duration={2} height={75} width='700px' />
						</>
					) : (
						<>
							<Skeleton duration={2} height={90} width='340px' />
							<Skeleton duration={2} height={90} width='340px' />
							<Skeleton duration={2} height={90} width='340px' />
							<Skeleton duration={2} height={90} width='340px' />
							<Skeleton duration={2} height={90} width='340px' />
							<Skeleton duration={2} height={90} width='340px' />
							<Skeleton duration={2} height={90} width='340px' />
							<Skeleton duration={2} height={90} width='340px' />
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default ResultsList;
