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
				flight_associated {
					id
					flyFrom
					flyTo
					cityFrom
					cityTo
					cityCodeFrom
					cityCodeTo
					utc_departure
					utc_arrival
					distance
					route {
						id
						flyFrom
						flyTo
						cityFrom
						cityCodeFrom
						cityTo
						cityCodeTo
						airline
						flight_no
						local_arrival
						utc_arrival
						local_departure
						utc_departure
					}
					airlines
					price
					deep_link
				}
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

export const destination_find_all_of_user = gql`
	query destination_find_all_of_user($email: String!) {
		destination_find_all_of_user(email: $email) {
			_id
			city
		}
	}
`;

export const user_trip_delete = gql`
	mutation user_trip_delete($email: String!, $tripId: ID!) {
		user_trip_delete(email: $email, tripId: $tripId)
	}
`;
