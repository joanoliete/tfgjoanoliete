import {
	ConflictException,
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Ref, ReturnModelType } from '@typegoose/typegoose';
import { ObjectID } from '../../common/types/objectid.type';
import { Errors } from '../../common/enums/errors.enum';
import { Flight } from '../../flight/schemas/flight.schema';
import { User } from '../schemas/user.schema';
import { DocumentType } from '@typegoose/typegoose/lib/types';
import { FlightService } from '../../flight/services/flight.service';
import { QueryObject } from '../../query/schemas/query.schema';
import { Trip } from '../../trip/schemas/trip.schema';

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
		@Inject(forwardRef(() => FlightService))
		private readonly flightService: FlightService
	) {}

	/**
	 * Adds a flight to a user favourites flights
	 * @param flight Flight object
	 * @param email User email
	 */
	async addFlightToUserFavourites(
		existingFlight: Flight,
		email: string
	): Promise<void> {
		const user = await this.findByEmail(email);

		user.savedFlights.push(existingFlight);

		await user.save();
	}

	/**
	 * Adds a searched query to a user history
	 * @param query Queryobject
	 * @param email User email
	 */
	async addQueryToUserHistory(
		newQuery: QueryObject,
		email: string
	): Promise<void> {
		const user = await this.findByEmail(email);

		user.searchQueries.push(newQuery);

		await user.save();
	}

	/**
	 * Adds a trip to a user
	 * @param trip Trip object
	 * @param email User email
	 */
	async addTripToUser(newTrip: Trip, email: string): Promise<void> {
		const user = await this.findByEmail(email);

		user.userTrips.push(newTrip);

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

	/**
	 * Descomposar aquest metode molt poc eficient carregar tot
	 * Finds a user by email and populates all info
	 * @param email String
	 * @returns User data
	 */
	findByEmail(email: string): Promise<DocumentType<User> | undefined> {
		return this.userModel
			.findOne({ email: email.toLowerCase() })
			.populate('savedFlights')
			.populate({
				path: 'userTrips',
				populate: {
					path: 'destinations',
					populate: {
						path: 'flight_associated',
					},
				},
			})
			.populate('searchQueries')
			.exec() as Promise<DocumentType<User>>;
	}

	/**
	 * Finds all users
	 * @returns Users data
	 */
	findAllUsers(): Promise<DocumentType<User>[] | undefined> {
		return this.userModel.find().exec() as Promise<DocumentType<User>[]>;
	}
}
