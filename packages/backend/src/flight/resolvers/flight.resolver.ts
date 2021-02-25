import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectIDPipe } from '../../common/pipes/objectid.pipe';
import { ObjectID } from '../../common/types/objectid.type';
import { FlightCreateDto } from '../dto/flight-create.dto';
import { Flight } from '../gqltypes/flight.gqlype';
import { FlightCreatePipe } from '../pipes/flight-create.pipe';
import { FlightService } from '../services/flight.service';

@Resolver(() => Flight)
export class FlightResolver {
	/**
	 * Dependency injection.
	 * @param flightService Flight service
	 */
	constructor(private readonly flightService: FlightService) {}

	/**
	 * Creates a new flight, and adds it to the user favourites flights.
	 *
	 * @param {ObjectID} userId User ObjectId
	 * @param flightData Flight creation data
	 * @returns Flight object id
	 */
	@Mutation(() => Boolean)
	async flight_create_and_user_addition(
		@Args('userId', ObjectIDPipe)
		userId: ObjectID,
		@Args('flightData', { type: () => FlightCreateDto }, FlightCreatePipe)
		flightData: FlightCreateDto
	) {
		await this.flightService.createFavouriteFlight(userId, flightData);
		return true;
	}
}
