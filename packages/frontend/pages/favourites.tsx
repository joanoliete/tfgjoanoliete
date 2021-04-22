import { useQuery } from '@apollo/react-hooks';
import React, { FC } from 'react';
import Loader from '../components/utils/loader';
import { favourite_flights_by_user_find_all } from '../gql/favourites.gql';
import withApollo from '../lib/apollo/apolloClient';
import Head from '../components/utils/head';
import { getSession, useSession } from 'next-auth/client';
import FlightsList from '../components/generic/Favourites/flights-list';
import NotFound from './404';

/**
 * Favourites route
 */
export const Favourites: FC = () => {
	const [session, loadingSession] = useSession();
	if (loadingSession) return null;
	if (!loadingSession && !session) return <NotFound />;

	const { data, loading } = useQuery(favourite_flights_by_user_find_all, {
		variables: {
			email: session.user.email,
		},
	});

	const favouriteFlightsList =
		data && !loading ? data.favourite_flights_by_user_find_all : null;

	return favouriteFlightsList ? (
		<>
			<Head title={`tfgjoanoliete | Favourite flights`} noindex />
			<FlightsList list={favouriteFlightsList} />
		</>
	) : (
		<Loader />
	);
};

/*  Export the `session` prop to use sessions with Server Side Rendering (Per si es vol fer SSR en un futur)
export async function getServerSideProps(context) {
	return {
		props: {
			session: await getSession(context),
		},
	};
} */

export default withApollo({ ssr: false })(Favourites);
