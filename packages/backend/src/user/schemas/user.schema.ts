import { Float, Int } from '@nestjs/graphql';
import { prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectID } from '../../common/types/objectid.type';
import { Flight } from '../../flight/schemas/flight.schema';

export class User {
	@prop({ required: true, unique: true })
	_id: string;

	@prop()
	email: string;

	@prop()
	emailverified: boolean;

	@prop({ default: null })
	createdAt: TimeStamps;

	@prop({ default: null })
	udaptedAt: TimeStamps;

	@prop({ type: () => Flight })
	savedFlights: Ref<Flight>[];

	@prop()
	searchQueries: string;

	@prop()
	userTrips: string;
}
