import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectID } from '../../common/types/objectid.type';
/**
 * Graphql type: Query with all its data.
 */

@ObjectType()
export class QueryObject {
	@Field()
	departure_ap: string;

	@Field()
	arrival_ap: string;

	@Field()
	departure_date: Date;

	@Field()
	arrival_date: Date;

	@Field(type => Int)
	adults: number;
}
