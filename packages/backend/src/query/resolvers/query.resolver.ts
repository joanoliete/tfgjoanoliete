import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Flight, ResultFlight } from 'src/flight/gqltypes/flight.gqlype';
import { ObjectID } from '../../common/types/objectid.type';
import { UserService } from '../../user/services/user.service';
import { Context, QueryCreateDto } from '../dto/query-create.dto';
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
	@Query(() => [ResultFlight])
	async query_create_and_user_addition(
		@Args('email', { type: () => String, nullable: true })
		email: string,
		@Args('context', { type: () => Context }) //QueryCreatePipe
		context: Context
	): Promise<any[]> {
		const url = '';
		console.log(context);

		//If user is logged we create Query and save it to its user
		if (email) {
			//Parse context to queryData and create
			//await this.queryService.createHistoryQueryAndAddition(email, queryData);
		}

		//Parsejar context com a params de la url

		//Search flights in a wrapped API in a service using context info
		const results = await this.queryService.searchProviderApiContext(url);
		return results;
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
