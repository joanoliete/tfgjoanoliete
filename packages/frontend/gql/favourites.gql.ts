import gql from 'graphql-tag';

export const favourite_flights_by_user_find_all = gql`
	query favourite_flights_by_user_find_all($email: String!) {
		favourite_flights_by_user_find_all(email: $email) {
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
		}
	}
`;

export const user_favourite_flight_delete = gql`
	mutation user_favourite_flight_delete($email: String!, $id: String!) {
		user_favourite_flight_delete(email: $email, id: $id)
	}
`;

export const flight_create_and_user_addition = gql`
	mutation flight_create_and_user_addition(
		$email: String!
		$flightData: FlightCreateDto!
	) {
		flight_create_and_user_addition(email: $email, flightData: $flightData)
	}
`;
