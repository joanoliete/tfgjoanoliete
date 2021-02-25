import {
	ConflictException,
	forwardRef,
	Inject,
	Injectable,
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
	 * @param FlightService Flight service
	 */
	constructor(
		@InjectModel(Flight)
		private readonly flightModel: ReturnModelType<typeof Flight>,
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService
	) {}

	/**
	 * Finds a flight by Url_reference
	 * @param {ObjectID} userId User ObjectId
	 * @param url_reference	url_reference String
	 * @returns Flight
	 */
	findFlightByUrl(url_reference: string): Promise<Flight> {
		return this.flightModel
			.findOne({ url_reference: url_reference })
			.exec() as Promise<Flight>;
	}

	/**
	 * Creates a new flight and add it to an favourite flight of an user.
	 * @param {ObjectID} userId User ObjectId
	 * @param flightData Flight creation data
	 * @returns void
	 */
	async createFavouriteFlight(
		userId: ObjectID,
		flightData: FlightCreateDto
	): Promise<void> {
		const { url_reference } = flightData;

		let existingFlight = await this.findFlightByUrl(url_reference);

		if (!existingFlight) {
			existingFlight = await this.flightModel.create({
				...flightData,
			});
		}

		await this.userService.addFlightToUserFavourites(existingFlight, userId);
	}

	/**
	 * Finds some floghts by an array of ids.
	 * @param flightsIds Flight ObjectIds array
	 * @returns Flights array
	 */
	findFlightsByArrayReference(
		flightIds: Ref<Flight, string>[]
	): Promise<Flight[]> {
		return this.flightModel.find().where('_id').in(flightIds).exec() as Promise<
			Flight[]
		>;
	}
}
