import gql from 'graphql-tag';

export const query_create_and_user_addition = gql`
	query query_create_and_user_addition(
		$email: String!
		$context: QueryCreateDto!
	) {
		query_create_and_user_addition(email: $email, context: $context) {
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

export const automatize_queries = gql`
	query automatize_queries($queries: [ID]!) {
		automatize_queries(queries: $queries) {
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

export const query_history_find_all_of_user = gql`
	query query_history_find_all_of_user($email: String!) {
		query_history_find_all_of_user(email: $email) {
			_id
			departure_ap
			arrival_ap
			departure_date
			arrival_date
			adults
		}
	}
`;

export const user_history_query_delete = gql`
	mutation user_history_query_delete($email: String!, $queryId: ID!) {
		user_history_query_delete(email: $email, queryId: $queryId)
	}
`;
