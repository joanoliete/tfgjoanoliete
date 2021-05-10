import { InputType, Field, Float, Int, ID } from '@nestjs/graphql';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Flight } from '../../flight/gqltypes/flight.gqlype';
import { ObjectID } from '../../common/types/objectid.type';
import { FlightCreateDto } from '../../flight/dto/flight-create.dto';

@InputType()
export class TripModifyDto {
	@Field({ nullable: true })
	name: string;

	@Field({ nullable: true })
	description: string;

	@Field(() => [DestinationModifyDto], { nullable: true })
	destinations?: DestinationModifyDto[];
}

@InputType()
export class DestinationModifyDto {
	@Field(() => ID, { nullable: true })
	_id?: ObjectID;

	@Field({ nullable: true })
	city: string;

	@Field({ nullable: true })
	arrival_date: Date;

	// @Field(() => FlightCreateDto, { nullable: true })
	// flight_associated?: FlightCreateDto;
}
