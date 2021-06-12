import {
	ConflictException,
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { QueryObject } from '../schemas/query.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { ObjectID } from '../../common/types/objectid.type';
import { Errors } from '../../common/enums/errors.enum';
import { DocumentType, Ref } from '@typegoose/typegoose/lib/types';
import { UserService } from './../../user/services/user.service';
import { QueryCreateDto } from '../dto/query-create.dto';
import { query } from 'express';
import fetch from 'node-fetch';
import { Flight } from '../../flight/gqltypes/flight.gqlype';

/**
 * Service for communicating with the Query database
 */
@Injectable()
export class QueryService {
	/**
	 * Dependency injection.
	 * @param queryModel Query typegoose entity
	 * @param UserService User service
	 */
	constructor(
		@InjectModel(QueryObject)
		private readonly queryModel: ReturnModelType<typeof QueryObject>,
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService
	) {}

	/**
	 * Creates a new query and add it to a history of given user.
	 * @param email User email String
	 * @param queryData Query creation data
	 * @returns void
	 */
	async createHistoryQueryAndAddition(
		email: string,
		queryData: QueryCreateDto
	): Promise<void> {
		const newQuery = await this.queryModel.create({
			...queryData,
		});

		await this.userService.addQueryToUserHistory(newQuery, email);
	}

	/**
	 * Finds all search Queries from history of a given user
	 * @param email String
	 * @returns Queries array
	 */
	async findAllHistoryQueriesByEmail(email: string): Promise<QueryObject[]> {
		const user = await this.userService.findByEmail(email);

		const queryReferences = user.searchQueries;

		//Cal popular searchQueries?
		return queryReferences;
	}

	/**
	 * Finds all QueriesObjects of the ID array
	 * @param queries String
	 * @returns Queries array
	 */
	async searchQueriesByArrayIDs(queries: ObjectID[]): Promise<QueryObject[]> {
		const queriesList = [];

		for (const id of queries) {
			queriesList.push(await this.findById(id));
		}

		return queriesList;
	}

	/**
	 * Finds all flights from our provider matching user context and returns json
	 * @param contextParsedUrl String
	 * @returns Array with flights
	 */
	async searchProviderApiContext(contextParsedUrl: string): Promise<Flight[]> {
		//Apikey on header
		const finalUrl =
			'https://tequila-api.kiwi.com/v2/search?' + contextParsedUrl;
		return await fetch(finalUrl, {
			headers: { apikey: 'yPYuWGgZ_S_2gqwxZ41hs-sYtiwaS78R' },
		})
			.then(res => res.json())
			.then(data => data.data);
	}

	/**
	 * Removes a query from search queries from given user
	 * @param email User email
	 * @param queryId ObjectId
	 */
	async deleteHistoryQueryFromUser(
		email: string,
		queryId: ObjectID
	): Promise<void> {
		const user = await this.userService.findByEmail(email);
		const query = await this.findById(queryId);
		if (!user) throw new NotFoundException('User does not exist');
		if (!query) throw new NotFoundException('Query does not exist');

		//We delete object from database
		await this.queryModel.deleteOne({ _id: queryId });

		//We delete reference of the user array
		user.searchQueries = user.searchQueries.filter(x => !x._id.equals(queryId));
		await user.save();
	}

	/**
	 * Finds a query by id.
	 * @param queryId Query ObjectId
	 * @returns Query data
	 */
	findById(queryId: ObjectID): Promise<DocumentType<QueryObject> | undefined> {
		return this.queryModel.findById(queryId).exec() as Promise<
			DocumentType<QueryObject>
		>;
	}
}
