import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectIDPipe } from '../../common/pipes/objectid.pipe';
import { ObjectID } from '../../common/types/objectid.type';
import { FlightCreateDto } from '../dto/flight-create.dto';
import { Flight } from '../gqltypes/flight.gqlype';
import { FlightCreatePipe } from '../pipes/flight-create.pipe';
import { FlightService } from '../services/flight.service';
import { UserService } from '../../user/services/user.service';

@Resolver(() => Flight)
export class FlightResolver {
	/**
	 * Dependency injection.
	 * @param flightService Flight service
	 */
	constructor(
		private readonly flightService: FlightService,
		private readonly userService: UserService
	) {}

	/**
	 * Finds all existing flights.
	 * @returns flights array
	 */
	@Query(() => [Flight])
	getAllFlights(): Promise<Flight[]> {
		return this.flightService.findAllFlights();
	}

	/**
	 * Segurament en un futur cambiar argument userId per sessionId
	 * Finds all existing favourite Flights of an user in our database.
	 * @param email User email
	 * @returns Flights array
	 */
	@Query(() => [Flight])
	favourite_flights_by_user_find_all(
		@Args('email', { type: () => String, nullable: false })
		email: string
	): Promise<Flight[]> {
		return this.userService.findAllFavouritesOfUserByEmail(email);
	}

	/**
	 * Creates a new flight, and adds it to the user favourites flights.
	 *
	 * @param {ObjectID} userId User ObjectId
	 * @param flightData Flight creation data
	 * @returns Flight object id
	 */
	@Mutation(() => Boolean)
	async flight_create_and_user_addition(
		@Args('email')
		email: string,
		@Args('flightData', { type: () => FlightCreateDto }, FlightCreatePipe)
		flightData: FlightCreateDto
	) {
		await this.flightService.createFavouriteFlight(email, flightData);
		return true;
	}

	/**
	 * Removes a favourite flight from an user
	 * @param email String
	 * @param flightId ObjectId
	 * @returns True if success
	 */
	@Mutation(() => Boolean)
	async user_favourite_flight_delete(
		@Args('email', { type: () => String })
		email: string,
		@Args('url_reference', { type: () => String })
		url_reference: string
	): Promise<boolean> {
		await this.userService.deleteFavouriteFlight(email, url_reference);
		return true;
	}
}