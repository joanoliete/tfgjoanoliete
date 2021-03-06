import { Float, Int } from '@nestjs/graphql';
import { modelOptions, mongoose, prop, Ref } from '@typegoose/typegoose';
import { QueryObject } from '../../query/schemas/query.schema';
import { ObjectID } from '../../common/types/objectid.type';
import { Flight } from '../../flight/schemas/flight.schema';
import { Trip } from '../../trip/schemas/trip.schema';

@modelOptions({ options: { allowMixed: 0 } })
export class User {
	_id: ObjectID;

	@prop()
	email: string;

	@prop()
	emailverified: boolean;

	@prop({ default: null })
	createdAt: Date;

	@prop({ default: null })
	udaptedAt: Date;

	@prop({ ref: () => Flight, default: [] })
	savedFlights: Flight[];

	@prop({ ref: () => QueryObject, default: [] })
	searchQueries: QueryObject[];

	@prop({ ref: () => Trip, default: [] })
	userTrips: Trip[];
}
