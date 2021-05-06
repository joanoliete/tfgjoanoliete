import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { kMaxLength } from 'node:buffer';
import { Flight } from 'src/flight/gqltypes/flight.gqlype';
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
	 * @returns Returns result array from provider
	 */
	@Query(() => [Flight])
	async query_create_and_user_addition(
		@Args('email', { type: () => String, nullable: true })
		email: string,
		@Args('context', { type: () => QueryCreateDto }) //QueryCreatePipe
		context: QueryCreateDto
	): Promise<any[]> {
		//If user is logged we create Query and save it to its user
		if (email != 'none') {
			const queryDataInput = {
				departure_ap: context.departure_ap,
				arrival_ap: context.arrival_ap,
				departure_date: context.departure_date,
			};
			await this.queryService.createHistoryQueryAndAddition(
				email,
				queryDataInput
			);
		}

		//Parse context to URL
		const url =
			'fly_from=' +
			context.departure_ap +
			'&fly_to=' +
			context.arrival_ap +
			'&limit=20&date_from=' +
			getFormattedDate(context.departure_date);

		//Search flights in a wrapped API in a service using context info
		const results = await this.queryService.searchProviderApiContext(url);
		return results;
	}

	/**
	 * Creates a new query, and adds it to the user history queries
	 * @param queries Array ObjectsID
	 * @returns True if success
	 */

	@Query(() => [Flight])
	async automatize_queries(
		@Args('queries', { type: () => [ID] })
		queries: ObjectID[]
	): Promise<any[]> {
		let results = [];
		//Buscar a la base de dades les queries passant array objectsIDs
		const queriesList = (await this.queryService.searchQueriesByArrayIDs(
			queries
		)) as QueryObject[];

		for (const query of queriesList) {
			//Parse context to URL
			const url =
				'fly_from=' +
				query.departure_ap +
				'&fly_to=' +
				query.arrival_ap +
				'&limit=2&date_from=' +
				getFormattedDate(new Date(query.departure_date));
			//We save best flight
			results = [
				...results,
				await this.queryService.searchProviderApiContext(url),
			];
		}

		console.log(results);
		return results.flat();
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

function getFormattedDate(date) {
	const year = date.getFullYear();
	const month = (1 + date.getMonth()).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');

	return day + '/' + month + '/' + year;
}
