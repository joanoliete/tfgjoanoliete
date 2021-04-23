import { InputType, Field, Float, Int, ID } from '@nestjs/graphql';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectID } from '../../common/types/objectid.type';

@InputType()
export class FlightCreateDto {
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
