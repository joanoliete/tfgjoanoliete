import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectIDPipe } from '../../common/pipes/objectid.pipe';
import { ObjectID } from '../../common/types/objectid.type';
import { Flight } from '../../flight/schemas/flight.schema';
import { User } from '../gqltypes/user.gqltype';
import { UserService } from '../services/user.service';

@Resolver(() => User)
export class UserResolver {
	/**
	 * Dependency injection.
	 * @param userService User service
	 */
	constructor(private readonly userService: UserService) {}

	/**
	 * Segurament en un futur cambiar argument userId per sessionId
	 * Finds all existing favourite Flights of an user in our database.
	 * @param {ObjectId} userId User ObjectId
	 * @returns Flights array
	 */
	@Query(() => [User])
	favourite_flights_by_user_find_all(
		@Args('userId', { type: () => String, nullable: false })
		userId: ObjectID
	): Promise<Flight[]> {
		return this.userService.findAllFavouritesByUser(userId);
	}
}
