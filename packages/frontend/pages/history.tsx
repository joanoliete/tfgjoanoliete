import { useQuery } from '@apollo/react-hooks';
import { useSession } from 'next-auth/client';
import React, { FC } from 'react';
import QueriesList from '../components/generic/Queries/queries-list';
import withApollo from '../lib/apollo/apolloClient';
import Head from '../components/utils/head';
import Loader from '../components/utils/loader';
import { query_history_find_all_of_user } from '../gql/queries.gql';
import NotFound from './404';

const History: FC = () => {
	const [session, loadingSession] = useSession();
	if (loadingSession) return null;
	if (!loadingSession && !session) return <NotFound />;

	const { data, loading } = useQuery(query_history_find_all_of_user, {
		variables: {
			email: session.user.email,
		},
	});

	const searchHistoryList =
		data && !loading ? data.query_history_find_all_of_user : null;

	return searchHistoryList ? (
		<>
			<Head title={`tfgjoanoliete | Search history`} noindex />
			<QueriesList list={searchHistoryList} />
		</>
	) : (
		<Loader />
	);
};

export default withApollo({ ssr: false })(History);
