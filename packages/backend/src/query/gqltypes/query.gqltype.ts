import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectID } from '../../common/types/objectid.type';
/**
 * Graphql type: Query with all its data.
 */

@ObjectType()
export class QueryObject {
	@Field()
	deaprture_ap: string;
}
