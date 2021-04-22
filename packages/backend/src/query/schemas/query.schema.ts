import { Float, Int } from '@nestjs/graphql';
import { modelOptions, mongoose, prop } from '@typegoose/typegoose';
import { ObjectID } from '../../common/types/objectid.type';

@modelOptions({ options: { allowMixed: 0 } })
export class QueryObject {
	_id: ObjectID;

	@prop()
	departure_ap: string;

	@prop()
	arrival_ap: string;

	@prop()
	departure_date: Date;

	@prop()
	arrival_date?: Date;

	@prop()
	adults?: number;
}
