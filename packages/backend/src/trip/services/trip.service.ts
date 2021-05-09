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
import { id } from 'date-fns/locale';
import { FlightCreateDto } from 'src/flight/dto/flight-create.dto';
import { User } from 'src/user/schemas/user.schema';
import { Flight } from 'src/flight/schemas/flight.schema';

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
		@InjectModel(Flight)
		private readonly flightModel: ReturnModelType<typeof Flight>,
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
		console.log(user);

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

		if (destinations) existingTrip.destinations = destinations;

		if (destinations) {
			destinations.forEach(async x => {
				if (!x._id) {
					await this.createAndAddDestination(tripId, x);
				} else {
					await this.updateDestination(x);
				}
			});
		}

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
			if (data.flight_associated) {
				const newFlightAssociated = await this.flightModel.findOne({
					id: data.flight_associated.id,
				});
				data.flight_associated = newFlightAssociated;
			}
			const newDestination = await this.destinationModel.create({
				...data,
			});
			destinations.push(newDestination);
		}
		return destinations;
	}

	/**
	 * Creates new destination and add its to a trip
	 * @param tripId ObjectID
	 * @param destinationData Destination input Array
	 * @returns boolean
	 */
	async createAndAddDestination(
		tripId: ObjectID,
		destinationData: DestinationCreateDto
	): Promise<boolean> {
		const trip = await this.findTripById(tripId);

		if (!trip) throw new NotFoundException('Trip does not exist');

		const newDestination = await this.destinationModel.create({
			...destinationData,
		});

		trip.destinations.push(newDestination);

		await trip.save();

		return true;
	}

	/**
	 * Updates destinations and add its to a trip
	 * @param tripId ObjectID
	 * @param destinationData Destination input Array
	 * @returns boolean
	 */
	async updateDestination(
		destinationData: DestinationCreateDto
	): Promise<boolean> {
		const destination = await this.findDestinationById(destinationData._id);

		if (!destination) throw new NotFoundException('Destination does not exist');

		if (destinationData.arrival_date)
			destination.arrival_date = destinationData.arrival_date;

		if (destinationData.city) destination.city = destinationData.city;

		await destination.save();

		return true;
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
	 * Adds Flight to a destination
	 * @param destInationId String
	 * @param FlightDTO Flight data
	 * @returns boolean
	 */
	async addFlightAssociatedToDestination(
		destinationId: ObjectID,
		flightData: Flight
	): Promise<boolean> {
		const destination = await this.findDestinationById(destinationId);

		if (!destination) throw new NotFoundException('Destination does not exist');

		destination.flight_associated = flightData;

		await destination.save();

		return true;
	}

	/**
	 * Finds a Trip by id.
	 * @param TripId Trip ObjectId
	 * @returns Trip data
	 */
	findTripById(tripId: ObjectID): Promise<DocumentType<Trip> | undefined> {
		return this.tripModel
			.findById(tripId)
			.populate('destinations')
			.exec() as Promise<DocumentType<Trip>>;
	}

	/**
	 * Finds a Destination by id.
	 * @param DestinationId Destination ObjectId
	 * @returns Destination data
	 */
	findDestinationById(
		destinationId: ObjectID
	): Promise<DocumentType<Destination> | undefined> {
		return this.destinationModel.findById(destinationId).exec() as Promise<
			DocumentType<Destination>
		>;
	}

	/**
	 * Finds all Destinations for a user given email
	 * @param email String
	 * @returns Array with destinations
	 */
	async findDestinationByEmail(email: string): Promise<Destination[]> {
		const destinationsArray = [];
		const user = await this.userService.findByEmail(email);
		user.userTrips.forEach(destinations => {
			destinations.destinations.forEach(element => {
				destinationsArray.push(element);
			});
		});
		return destinationsArray;
	}
}
