import { Float, Int } from '@nestjs/graphql';
import { modelOptions, mongoose, prop } from '@typegoose/typegoose';
import { ObjectID } from '../../common/types/objectid.type';

@modelOptions({ options: { allowMixed: 0 } })
export class Flight {
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
	adults: number;

	@prop()
	children: number;

	@prop()
	price: number;
}
