import { Args, Query, Resolver } from '@nestjs/graphql';
import { ObjectID } from 'src/common/types/objectid.type';
import { Flight } from '../gqltypes/flight.gqlype';
import { FlightService } from '../services/flight.service';

@Resolver(() => Flight)
export class FlightResolver {
	/**
	 * Dependency injection.
	 * @param flightService Course service
	 */
	constructor(private readonly flightService: FlightService) {}

	/**
	 * Finds all existing favourite Flights of an user in our database.
	 * @param userId userId ObjectId
	 * @returns Flights array
	 */
	@Query(() => [Flight])
	flights_favourites_by_user_find_all(
		@Args('userId', { type: () => String, nullable: false })
		userId: ObjectID
	): Promise<Flight[]> {
		return this.flightService.findAllFavouritesByUser(userId);
	}
}
