import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectID } from '../../common/types/objectid.type';
import { UserService } from '../../user/services/user.service';
import { QueryCreateDto } from '../dto/query-create.dto';
import { QueryObject } from '../gqltypes/query.gqltype';
import { QueryService } from '../services/query.service';

@Resolver(() => QueryObject)
export class QueryResolver {
	/**
	 * Dependency injection.
	 * @param queryService Query service
	 */
	constructor(private readonly queryService: QueryService) {}

	/**
	 * Segurament en un futur cambiar argument email per sessionId
	 * Finds all existing Query history of an user in our database.
	 * @param email User email
	 * @returns Query array
	 */
	@Query(() => [QueryObject])
	query_history_find_all_of_user(
		@Args('email', { type: () => String, nullable: false })
		email: string
	): Promise<QueryObject[]> {
		return this.queryService.findAllHistoryQueriesByEmail(email);
	}

	/**
	 * Creates a new query, and adds it to the user history queries
	 * @param email User email String
	 * @param queryData Query creation data
	 * @returns True if success
	 */
	@Mutation(() => Boolean)
	async query_create_and_user_addition(
		@Args('email')
		email: string,
		@Args('queryData', { type: () => QueryCreateDto }) //QueryCreatePipe
		queryData: QueryCreateDto
	) {
		await this.queryService.createHistoryQueryAndAddition(email, queryData);
		return true;
	}

	/**
	 * Removes a history query from an user
	 * @param email String
	 * @param queryId ObjectId
	 * @returns True if success
	 */
	@Mutation(() => Boolean)
	async user_history_query_delete(
		@Args('email', { type: () => String })
		email: string,
		@Args('queryId', { type: () => ID })
		queryId: ObjectID
	): Promise<boolean> {
		await this.queryService.deleteHistoryQueryFromUser(email, queryId);
		return true;
	}
}
