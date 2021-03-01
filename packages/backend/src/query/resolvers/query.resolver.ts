import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QueryObject } from '../gqltypes/query.gqltype';
import { QueryService } from '../services/query.service';

@Resolver(() => QueryObject)
export class QueryResolver {
	/**
	 * Dependency injection.
	 * @param queryService Query service
	 */
	constructor(private readonly queryService: QueryService) {}
}
