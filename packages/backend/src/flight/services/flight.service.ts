import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Flight } from '../schemas/flight.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { ObjectID } from 'src/common/types/objectid.type';

/**
 * Service for communicating with the Flight database
 * @preferred
 */
@Injectable()
export class FlightService {
	/**
	 * Dependency injection.
	 * @param flightModel Flights typegoose entity
	 */
	constructor(
		@InjectModel(Flight)
		private readonly flightModel: ReturnModelType<typeof Flight>
	) {}

	/**
	 * Finds all existing favourite flights of an user.
	 * @param userId userId ObjectId
	 * @returns Flights array
	 */
	findAllFavouritesByUser(userId: ObjectID): Promise<Flight[]> {
		return this.flightModel.find({ userId: userId }).exec() as Promise<
			Flight[]
		>;
	}
}
