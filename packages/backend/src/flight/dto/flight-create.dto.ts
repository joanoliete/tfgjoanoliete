import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectID } from '../../common/types/objectid.type';

@InputType()
export class FlightCreateDto {
	@Field()
	_id: string;

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

	@Field()
	adults: typeof Int;

	@Field()
	children: typeof Int;

	@Field()
	price: typeof Float;
}
