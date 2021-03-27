import { Field, Float, Int, ID, ObjectType } from '@nestjs/graphql';
import { ObjectID } from 'src/common/types/objectid.type';
import { Flight } from '../../flight/gqltypes/flight.gqlype';

/**
 * Graphql type: Trips with all its data.
 */

@ObjectType()
export class Trip {
	@Field(() => ID)
	_id: ObjectID;

	@Field()
	name: string;

	@Field()
	description: string;

	@Field(() => [Destination])
	destinations?: Destination[];
}

@ObjectType()
export class Destination {
	@Field(() => ID)
	_id: ObjectID;

	@Field()
	city: string;

	@Field()
	arrival_date: Date;

	@Field(() => Flight, { nullable: true })
	flight_associated?: Flight;
}
