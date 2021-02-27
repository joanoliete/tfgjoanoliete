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
	 * Finds all existingflights in database.
	 * @returns Flights array
	 */
	@Query(() => [User])
	getAllUsers(): Promise<User[]> {
		return this.userService.findAllUsers();
	}
}
