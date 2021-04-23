import {
	ConflictException,
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Flight } from '../schemas/flight.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { ObjectID } from '../../common/types/objectid.type';
import { FlightCreateDto } from '../dto/flight-create.dto';
import { Errors } from '../../common/enums/errors.enum';
import { UserService } from './../../user/services/user.service';
import { DocumentType, Ref } from '@typegoose/typegoose/lib/types';

/**
 * Service for communicating with the Flight database
 */
@Injectable()
export class FlightService {
	/**
	 * Dependency injection.
	 * @param flightModel Flights typegoose entity
	 * @param UserService User service
	 */
	constructor(
		@InjectModel(Flight)
		private readonly flightModel: ReturnModelType<typeof Flight>,
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService
	) {}

	/**
	 * Finds a flight by id
	 * @param {ObjectID} userId User ObjectId
	 * @param id	id String
	 * @returns Flight
	 */
	findFlightByUrl(id: string): Promise<Flight> {
		return this.flightModel.findOne({ id: id }).exec() as Promise<Flight>;
	}

	/**
	 * Creates a new flight and add it to an favourite flight of given user.
	 * @param {ObjectID} userId User ObjectId
	 * @param flightData Flight creation data
	 * @returns void
	 */
	async createFavouriteFlight(
		email: string,
		flightData: FlightCreateDto
	): Promise<void> {
		const { id } = flightData;

		let existingFlight = await this.findFlightByUrl(id);

		if (!existingFlight) {
			existingFlight = await this.flightModel.create({
				...flightData,
			});
		}

		await this.userService.addFlightToUserFavourites(existingFlight, email);
	}

	/**
	 * Removes a flight from favourites flights of an user
	 * @param flight Flight object
	 * @param email User email
	 */
	async deleteFavouriteFlight(email: string, id: string): Promise<void> {
		const user = await this.userService.findByEmail(email);
		if (!user) throw new NotFoundException('User does not exist');

		//const flight=await this.flightService.findById(flightId);
		//if (!flight) throw new NotFoundException('Flight does not exist');

		user.savedFlights = user.savedFlights.filter(x => x.id !== id);

		await user.save();
	}

	/**
	 * Finds all existing favourite flights of an user by email
	 * @param email String
	 * @returns Flights array
	 */
	async findAllFavouritesOfUserByEmail(email: string): Promise<Flight[]> {
		const user = await this.userService.findByEmail(email);

		const flightsReferences = user.savedFlights;

		//Populate sha de fer servir
		//return this.flightService.findFlightsByArrayReference(flightsReferences);
		return flightsReferences;
	}

	/**
	 * Finds some flights by an array of ids.
	 * @param flightsIds Flight ObjectIds array
	 * @returns Flights array
	 */
	findFlightsByArrayReference(
		flightIds: Ref<Flight, ObjectID>[]
	): Promise<Flight[]> {
		return this.flightModel.find().where('_id').in(flightIds).exec() as Promise<
			Flight[]
		>;
	}

	/**
	 * Finds a flight by id.
	 * @param flightId Flight ObjectId
	 * @returns Flight data
	 */
	findById(flightId: ObjectID): Promise<DocumentType<Flight> | undefined> {
		return this.flightModel.findById(flightId).exec() as Promise<
			DocumentType<Flight>
		>;
	}

	/**
	 * Finds a flight by id
	 * @param id String
	 * @returns Flight data
	 */
	findByEmail(id: string): Promise<DocumentType<Flight> | undefined> {
		return this.flightModel.findOne({ id: id.toLowerCase() }).exec() as Promise<
			DocumentType<Flight>
		>;
	}

	/**
	 * Finds all flights in database
	 * @returns Flight array
	 */
	findAllFlights(): Promise<DocumentType<Flight>[] | undefined> {
		return this.flightModel.find().exec() as Promise<DocumentType<Flight>[]>;
	}

	/**
	 * Finds all existing favourite flights of an user by userId
	 * @param userId userId ObjectId
	 * @returns Flights array
	 */
	async findAllFavouritesOfUserById(userId: ObjectID): Promise<Flight[]> {
		const user = await this.userService.findById(userId);

		const flightsReferences = user.savedFlights;

		//Cal popular?
		return this.findFlightsByArrayReference(flightsReferences);
	}
}
