import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DestinationCreateDto, TripCreateDto } from '../dto/trip-create.dto';
import { Destination, Trip } from '../gqltypes/trip.gqltype';
import { TripService } from '../services/trip.service';
import { ObjectID } from '../../common/types/objectid.type';
import { TripModifyDto } from '../dto/trip-modify.dto';
import { FlightCreateDto } from 'src/flight/dto/flight-create.dto';
import { Flight } from 'src/flight/gqltypes/flight.gqlype';

@Resolver(() => Trip)
export class TripResolver {
	/**
	 * Dependency injection.
	 * @param tripService Trip service
	 */
	constructor(private readonly tripService: TripService) {}

	/**
	 * Finds all existing Trips from a user in our database, with destinations
	 * @param email User email
	 * @returns Trip array
	 */
	@Query(() => [Trip])
	trip_find_all_of_user(
		@Args('email', { type: () => String, nullable: false })
		email: string
	): Promise<Trip[]> {
		return this.tripService.findAllTripsByEmail(email);
	}

	/**
	 * Finds all existing Destinations from a user in our database
	 * @param email User email
	 * @returns Destination array
	 */
	@Query(() => [Destination])
	destination_find_all_of_user(
		@Args('email', { type: () => String, nullable: false })
		email: string
	): Promise<Destination[]> {
		return this.tripService.findDestinationByEmail(email);
	}

	/**
	 * Creates a new trip, and adds it to the user
	 * @param email User email String
	 * @param tripData Trip creation data
	 * @returns True if success
	 */
	@Mutation(() => Boolean)
	async trip_create_and_user_addition(
		@Args('email')
		email: string,
		@Args('tripData', { type: () => TripCreateDto }) //TripCreatePipe
		tripData: TripCreateDto
	) {
		await this.tripService.createTripAndAddition(email, tripData);
		return true;
	}

	/**
	 * Updates a new trip, and adds it to the user
	 * @param tripId User email String
	 * @param tripData Trip creation data
	 * @returns True if success
	 */
	@Mutation(() => Boolean)
	async trip_modify(
		@Args('tripId', { type: () => ID })
		tripId: ObjectID,
		@Args('tripData', { type: () => TripModifyDto })
		tripData: TripModifyDto
	) {
		await this.tripService.modifyTrip(tripId, tripData);
		return true;
	}

	/**
	 * Removes a trip from an user
	 * @param email String
	 * @param tripId ObjectId
	 * @returns True if success
	 */
	@Mutation(() => Boolean)
	async user_trip_delete(
		@Args('email', { type: () => String })
		email: string,
		@Args('tripId', { type: () => ID })
		tripId: ObjectID
	): Promise<boolean> {
		await this.tripService.deleteTripFromUser(email, tripId);
		return true;
	}

	/**
	 * Adds an flight to a destination
	 * @param destInationId String
	 * @param FlightDTO Flight data
	 * @returns True if success
	 */
	@Mutation(() => Boolean)
	async user_destination_add_flight_associated(
		@Args('destinationId', { type: () => ID })
		destinationId: ObjectID,
		@Args('flightData', { type: () => FlightCreateDto })
		flightData: Flight
	): Promise<boolean> {
		await this.tripService.addFlightAssociatedToDestination(
			destinationId,
			flightData
		);
		return true;
	}

	/**
	 * Removes a destination from an user
	 * @param tripId ObjectId
	 * @param destinationId ObjectId
	 * @returns True if success
	 */
	@Mutation(() => Boolean)
	async user_trip_destination_delete(
		@Args('tripId', { type: () => ID })
		tripId: ObjectID,
		@Args('destinationId', { type: () => ID })
		destinationId: ObjectID
	): Promise<boolean> {
		await this.tripService.deleteDestinationFromUser(tripId, destinationId);
		return true;
	}
}
