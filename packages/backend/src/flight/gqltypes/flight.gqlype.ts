import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectID } from '../../common/types/objectid.type';
/**
 * Graphql type: Flights with all its data.
 */

@ObjectType()
export class Flight {
	@Field()
	url_reference: string;

	@Field()
	fly_from: string;

	@Field()
	fly_to: string;

	@Field()
	date_from: Date;

	@Field()
	date_to: Date;

	@Field(type => Int)
	adults: number;

	@Field(type => Int)
	children: number;

	@Field(type => Float)
	price: number;
}