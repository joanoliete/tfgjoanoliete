import gql from 'graphql-tag';

export const trip_find_all_of_user = gql`
	query trip_find_all_of_user($email: String!) {
		trip_find_all_of_user(email: $email) {
			_id
			name
			description
			destinations {
				_id
				city
				arrival_date
				flight_associated
			}
		}
	}
`;

export const trip_create_and_user_addition = gql`
	mutation trip_create_and_user_addition(
		$email: String!
		$tripData: TripCreateDto!
	) {
		trip_create_and_user_addition(email: $email, tripData: $tripData)
	}
`;

export const trip_modify = gql`
	mutation trip_modify($tripId: ID!, $tripData: TripModifyDto!) {
		trip_modify(tripId: $tripId, tripData: $tripData)
	}
`;

export const user_trip_delete = gql`
	mutation user_trip_delete($email: String!, $tripId: ID!) {
		user_trip_delete(email: $email, tripId: $tripId)
	}
`;
