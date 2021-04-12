import { Float, Int } from '@nestjs/graphql';
import { modelOptions, mongoose, prop } from '@typegoose/typegoose';
import { Flight } from '../../flight/schemas/flight.schema';
import { ObjectID } from '../../common/types/objectid.type';

export class Trip {
	_id: ObjectID;

	@prop()
	name: string;

	@prop()
	description: string;

	@prop({ ref: () => Destination, default: [] })
	destinations?: Destination[];
}

export class Destination {
	_id?: ObjectID;

	@prop()
	city: string;

	@prop()
	arrival_date: Date;

	@prop({ ref: () => Flight })
	flight_associated?: Flight;
}
