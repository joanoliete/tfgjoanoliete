import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Flight } from '../../flight/gqltypes/flight.gqlype';
import { ObjectID } from '../../common/types/objectid.type';

/**
 * Graphql type: User with all its data.
 */

@ObjectType()
export class User {
	@Field()
	email: string;

	@Field()
	emailverified: boolean;

	@Field()
	createdAt: Date;

	@Field()
	udaptedAt: Date;

	@Field(() => [Flight])
	savedFlights?: Flight[];

	@Field()
	searchQueries?: string;

	@Field()
	userTrips?: string;
}
