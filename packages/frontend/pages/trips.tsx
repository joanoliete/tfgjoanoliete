import { useQuery } from '@apollo/react-hooks';
import { getSession, useSession } from 'next-auth/client';
import React, { FC, useContext, useEffect } from 'react';
import TripsList from '../components/generic/trips-list';
import withApollo from '../lib/apollo/apolloClient';
import Head from '../components/utils/head';
import Loader from '../components/utils/loader';
import { trip_find_all_of_user } from '../gql/trips.gql';

const Trips: FC = () => {
	const [session, loadingSession] = useSession();

	const { data, loading } = useQuery(trip_find_all_of_user, {
		variables: {
			email: session.user.email,
		},
	});

	const tripsList = data && !loading ? data.trip_find_all_of_user : null;

	return tripsList ? (
		<>
			<Head title={`tfgjoanoliete | Trips`} noindex />
			<TripsList list={tripsList} />
		</>
	) : (
		<Loader />
	);
};

// Export the `session` prop to use sessions with Server Side Rendering (Per si es vol fer SSR en un futur)
export async function getServerSideProps(context) {
	return {
		props: {
			session: await getSession(context),
		},
	};
}

export default withApollo({ ssr: false })(Trips);
