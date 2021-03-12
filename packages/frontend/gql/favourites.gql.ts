import gql from 'graphql-tag';

export const favourite_flights_by_user_find_all = gql`
	query favourite_flights_by_user_find_all($email: String!) {
		favourite_flights_by_user_find_all(email: $email) {
			url_reference
			fly_from
			fly_to
			date_from
			date_to
			price
		}
	}
`;
