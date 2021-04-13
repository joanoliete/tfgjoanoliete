import {
	ConflictException,
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Destination, Trip } from '../schemas/trip.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { ObjectID } from '../../common/types/objectid.type';
import { Errors } from '../../common/enums/errors.enum';
import { DocumentType, Ref } from '@typegoose/typegoose/lib/types';
import { UserService } from './../../user/services/user.service';
import { DestinationCreateDto, TripCreateDto } from '../dto/trip-create.dto';
import { TripModifyDto } from '../dto/trip-modify.dto';

/**
 * Service for communicating with the Trip database
 */
@Injectable()
export class TripService {
	/**
	 * Dependency injection.
	 * @param tripModel Trip typegoose entity
	 * @param UserService User service
	 */
	constructor(
		@InjectModel(Trip)
		private readonly tripModel: ReturnModelType<typeof Trip>,
		@InjectModel(Destination)
		private readonly destinationModel: ReturnModelType<typeof Destination>,
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService
	) {}

	/**
	 * Finds all trips of a given user
	 * @param email String
	 * @returns Trips array
	 */
	async findAllTripsByEmail(email: string): Promise<Trip[]> {
		const user = await this.userService.findByEmail(email);

		const tripsReferences = user.userTrips;

		return tripsReferences;
	}

	/**
	 * Creates a new trip and add it to a given user.
	 * @param email User email String
	 * @param tripData Trip creation data
	 * @returns void
	 */
	async createTripAndAddition(
		email: string,
		tripData: TripCreateDto
	): Promise<void> {
		const newDestinations = await this.createDestinations(
			tripData.destinations
		);

		const changedTripData = tripData;
		changedTripData.destinations = newDestinations;
		const newTrip = await this.tripModel.create({
			...changedTripData,
		});

		await this.userService.addTripToUser(newTrip, email);
	}

	/**
	 * Modifies an axisting trip data.
	 * @param tripId Trip ObjectId
	 * @param tripData.name Trip new name
	 * @param tripData.description Trip new description
	 * @param tripData.destinations Trip destinations
	 */
	async modifyTrip(
		tripId: ObjectID,
		{ name, description, destinations }: TripModifyDto
	): Promise<void> {
		const existingTrip = await this.findTripById(tripId);

		if (!existingTrip) throw new NotFoundException('Trip not found');

		if (name) existingTrip.name = name;
		if (description) existingTrip.description = description;
		//Modify destination in his document otherwise it doesnt udapte, fer nou metode
		if (destinations) existingTrip.destinations = destinations;

		await existingTrip.save();
	}

	/**
	 * Removes a trip from a given user
	 * @param email User email
	 * @param tripId ObjectId
	 */
	async deleteTripFromUser(email: string, tripId: ObjectID): Promise<void> {
		const user = await this.userService.findByEmail(email);
		if (!user) throw new NotFoundException('User does not exist');

		//We delete trip object from database
		await this.tripModel.deleteOne({ _id: tripId });

		user.userTrips = user.userTrips.filter(x => !x._id.equals(tripId));
		await user.save();
	}

	/**
	 * Creates new Destinations and returns it as an Array
	 * @param destinationData Destination input Array
	 * @returns void
	 */
	async createDestinations(
		destinationData: DestinationCreateDto[]
	): Promise<DestinationCreateDto[]> {
		const destinations = [] as DocumentType<Destination>[];

		for (const data of destinationData) {
			const newDestination = await this.destinationModel.create({
				...data,
			});
			destinations.push(newDestination);
		}
		return destinations;
	}

	/**
	 * Removes a destination from a given user trip
	 * @param tripId ObjectId
	 * @param destinationId ObjectId
	 */
	async deleteDestinationFromUser(
		tripId: ObjectID,
		destinationId: ObjectID
	): Promise<void> {
		const trip = await this.findTripById(tripId);

		if (!trip) throw new NotFoundException('Trip does not exist');

		const destination = await this.findDestinationById(destinationId);

		if (!destination) throw new NotFoundException('Destination does not exist');

		await destination.remove();

		trip.destinations = trip.destinations.filter(
			x => !x._id.equals(destinationId)
		);
	}

	/**
	 * Finds a Trip by id.
	 * @param TripId Trip ObjectId
	 * @returns Trip data
	 */
	findTripById(tripId: ObjectID): Promise<DocumentType<Trip> | undefined> {
		return this.tripModel.findById(tripId).exec() as Promise<
			DocumentType<Trip>
		>;
	}

	/**
	 * Finds a Destination by id.
	 * @param DestinationId Destination ObjectId
	 * @returns Trip data
	 */
	findDestinationById(
		destinationId: ObjectID
	): Promise<DocumentType<Destination> | undefined> {
		return this.destinationModel.findById(destinationId).exec() as Promise<
			DocumentType<Destination>
		>;
	}
}
