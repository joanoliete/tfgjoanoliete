import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { ObjectID } from '../../common/types/objectid.type';

/**
 * Graphql type: User with all its data.
 */

@ObjectType()
export class User {
	@Field()
	_id: string;

	@Field()
	email: string;

	@Field()
	emailverified: boolean;

	@Field()
	createdAt: string;

	@Field()
	udaptedAt: string;

	@Field()
	savedFlights?: ObjectID[];

	@Field()
	searchQueries?: ObjectID[];

	@Field()
	userTrips?: ObjectID[];
}
