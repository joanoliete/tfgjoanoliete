import {
	ConflictException,
	forwardRef,
	Inject,
	Injectable,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Ref, ReturnModelType } from '@typegoose/typegoose';
import { ObjectID } from '../../common/types/objectid.type';
import { Errors } from '../../common/enums/errors.enum';
import { Flight } from '../../flight/schemas/flight.schema';
import { User } from '../schemas/user.schema';
import { DocumentType } from '@typegoose/typegoose/lib/types';
import { FlightService } from '../../flight/services/flight.service';

/**
 * Service for communicating with the User database
 */
@Injectable()
export class UserService {
	/**
	 * Dependency injection.
	 * @param userModel User typegoose entity
	 */
	constructor(
		@InjectModel(User)
		private readonly userModel: ReturnModelType<typeof User>,
		@Inject(forwardRef(() => UserService))
		private readonly flightService: FlightService
	) {}

	/**
	 * Finds all existing favourite flights of an user.
	 * @param userId userId ObjectId
	 * @returns Flights array
	 */
	async findAllFavouritesByUser(userId: ObjectID): Promise<Flight[]> {
		const user = await this.findById(userId);

		const flightsReferences = user.savedFlights;

		//Fer funció a flights service que donat un array de ObjectsID retorni un array amb tots els vols, es la manera mes eficient?
		return this.flightService.findFlightsByArrayReference(flightsReferences);
	}

	/**
	 * Adds a flight to a user favourites flights
	 * @param flight Flight object
	 * @param userId User ObjectId
	 */
	async addFlightToUserFavourites(
		existingFlight: Flight,
		userId: ObjectID
	): Promise<void> {
		const user = await this.findById(userId);

		user.savedFlights.push(existingFlight._id);

		await user.save();
	}

	/**
	 * Finds a user by id.
	 * @param userId User ObjectId
	 * @returns User data
	 */
	findById(userId: ObjectID): Promise<DocumentType<User> | undefined> {
		return this.userModel.findById(userId).exec() as Promise<
			DocumentType<User>
		>;
	}
}
