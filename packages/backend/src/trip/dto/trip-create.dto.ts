import { InputType, Field, Float, Int, ID } from '@nestjs/graphql';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Flight } from '../../flight/gqltypes/flight.gqlype';
import { ObjectID } from '../../common/types/objectid.type';
import { FlightCreateDto } from '../../flight/dto/flight-create.dto';

@InputType()
export class TripCreateDto {
	@Field()
	name: string;

	@Field()
	description: string;

	@Field(() => [DestinationCreateDto], { nullable: true })
	destinations?: DestinationCreateDto[];
}

@InputType()
export class DestinationCreateDto {
	@Field(() => ID)
	_id: ObjectID;

	@Field()
	city: string;

	@Field()
	arrival_date: Date;

	@Field(() => FlightCreateDto, { nullable: true })
	flight_associated?: FlightCreateDto;
}
