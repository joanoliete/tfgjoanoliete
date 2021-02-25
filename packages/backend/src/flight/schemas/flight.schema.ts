import { Float, Int } from '@nestjs/graphql';
import { prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectID } from '../../common/types/objectid.type';

export class Flight {
	@prop({ required: true, unique: true })
	_id: string;

	@prop()
	url_reference: string;

	@prop()
	fly_from: string;

	@prop()
	fly_to: string;

	@prop()
	date_from: Date;

	@prop()
	date_to: Date;

	@prop()
	adults: typeof Int;

	@prop()
	children: typeof Int;

	@prop()
	price: typeof Float;
}
