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

	@Field(type => [String])
	airlines: [string];

	@Field(type => Float)
	price: number;
}
