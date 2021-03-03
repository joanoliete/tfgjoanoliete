import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Flight } from '../../flight/gqltypes/flight.gqlype';
import { ObjectID } from '../../common/types/objectid.type';
import { QueryObject } from '../../query/gqltypes/query.gqltype';

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

	@Field(() => [QueryObject])
	searchQueries?: QueryObject[];

	@Field()
	userTrips?: string;
}
