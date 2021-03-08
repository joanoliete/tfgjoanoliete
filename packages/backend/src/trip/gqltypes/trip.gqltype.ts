import { Field, Float, Int, ID, ObjectType } from '@nestjs/graphql';
import { ObjectID } from '../../common/types/objectid.type';
import { Flight } from '../../flight/gqltypes/flight.gqlype';

/**
 * Graphql type: Trips with all its data.
 */

@ObjectType()
export class Trip {
	@Field()
	name: string;

	@Field()
	description: string;

	@Field(() => [Destination])
	destinations?: Destination[];
}

@ObjectType()
export class Destination {
	@Field()
	city: string;

	@Field()
	aeroport: string;

	@Field()
	arrival_date: Date;

	@Field(() => Flight)
	flight_associated?: Flight;
}