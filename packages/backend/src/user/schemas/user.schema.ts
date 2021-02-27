import { Float, Int } from '@nestjs/graphql';
import { modelOptions, mongoose, prop, Ref } from '@typegoose/typegoose';
import { ObjectID } from '../../common/types/objectid.type';
import { Flight } from '../../flight/schemas/flight.schema';

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

	@prop()
	searchQueries: string;

	@prop()
	userTrips: string;
}
