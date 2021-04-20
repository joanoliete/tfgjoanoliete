import gql from 'graphql-tag';

export const query_create_and_user_addition = gql`
	query query_create_and_user_addition($email: String!, $context: Context!) {
		query_create_and_user_addition(email: $email, context: $context) {
			price
			flyTo
			flyFrom
			utc_departure
			utc_arrival
			id
			airlines
		}
	}
`;
