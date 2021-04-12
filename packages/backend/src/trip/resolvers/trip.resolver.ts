import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DestinationCreateDto, TripCreateDto } from '../dto/trip-create.dto';
import { Trip } from '../gqltypes/trip.gqltype';
import { TripService } from '../services/trip.service';
import { ObjectID } from '../../common/types/objectid.type';
import { TripModifyDto } from '../dto/trip-modify.dto';

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
