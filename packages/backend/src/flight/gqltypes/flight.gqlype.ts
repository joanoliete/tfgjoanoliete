import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectID } from '../../common/types/objectid.type';
/**
 * Graphql type: Flights with all its data.
 */
@ObjectType()
export class Flight {
	@Field()
	id: string;

	@Field()
	flyFrom: string;

	@Field()
	flyTo: string;

	@Field()
	cityFrom: string;

	@Field()
	cityTo: string;

	@Field()
	cityCodeFrom: string;

	@Field()
	cityCodeTo: string;

	@Field({ nullable: true })
	utc_departure?: string;

	@Field({ nullable: true })
	utc_arrival?: string;

	@Field(type => Float)
	distance: number;

	@Field(type => [Route])
	route: [Route];

	@Field(type => [String])
	airlines: [string];

	@Field(type => Float)
	price: number;

	@Field({ nullable: true })
	deep_link: string;
}

@ObjectType()
export class Route {
	@Field({ nullable: true })
	id?: string;

	@Field({ nullable: true })
	flyFrom?: string;

	@Field({ nullable: true })
	flyTo?: string;

	@Field({ nullable: true })
	cityFrom?: string;

	@Field({ nullable: true })
	cityCodeFrom?: string;

	@Field({ nullable: true })
	cityTo?: string;

	@Field({ nullable: true })
	cityCodeTo?: string;

	@Field({ nullable: true })
	airline?: string;

	@Field(type => Int, { nullable: true })
	flight_no?: number;

	@Field({ nullable: true })
	local_arrival?: string;

	@Field({ nullable: true })
	utc_arrival?: string;

	@Field({ nullable: true })
	local_departure?: string;

	@Field({ nullable: true })
	utc_departure?: string;
}
