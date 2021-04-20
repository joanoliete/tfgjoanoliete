import { InputType, Field, Float, Int, ID } from '@nestjs/graphql';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectID } from '../../common/types/objectid.type';

@InputType()
export class QueryCreateDto {
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

@InputType()
export class Context {
	@Field()
	travelFrom: string;

	@Field()
	travelTo: string;

	@Field()
	dateFrom: Date;

	@Field()
	dateTo: Date;
}
