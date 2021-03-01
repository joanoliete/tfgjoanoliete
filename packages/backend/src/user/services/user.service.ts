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
	 * Finds all existing favourite flights of an user by userId
	 * @param userId userId ObjectId
	 * @returns Flights array
	 */
	async findAllFavouritesOfUserById(userId: ObjectID): Promise<Flight[]> {
		const user = await this.findById(userId);

		const flightsReferences = user.savedFlights;

		//Fer funció a flights service que donat un array de ObjectsID retorni un array amb tots els vols, es la manera mes eficient?
		return this.flightService.findFlightsByArrayReference(flightsReferences);
	}

	/**
	 * Finds all existing favourite flights of an user by email
	 * @param email String
	 * @returns Flights array
	 */
	async findAllFavouritesOfUserByEmail(email: string): Promise<Flight[]> {
		const user = await this.findByEmail(email);

		const flightsReferences = user.savedFlights;

		//Fer funció a flights service que donat un array de ObjectsID retorni un array amb tots els vols, populate sha de fer servir
		//return this.flightService.findFlightsByArrayReference(flightsReferences);
		return flightsReferences;
	}

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
	 * Removes a flight from favourites flights of an user
	 * @param flight Flight object
	 * @param email User email
	 */
	async deleteFavouriteFlight(
		email: string,
		url_reference: string
	): Promise<void> {
		const user = await this.findByEmail(email);
		if (!user) throw new NotFoundException('User does not exist');

		//const flight=await this.flightService.findById(flightId);
		//if (!flight) throw new NotFoundException('Flight does not exist');

		user.savedFlights = user.savedFlights.filter(
			x => x.url_reference !== url_reference
		);

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
	 * Finds a user by email.
	 * @param email String
	 * @returns User data
	 */
	findByEmail(email: string): Promise<DocumentType<User> | undefined> {
		return this.userModel
			.findOne({ email: email.toLowerCase() })
			.populate('savedFlights')
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
