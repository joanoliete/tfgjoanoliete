import {
	ConflictException,
	forwardRef,
	Inject,
	Injectable,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { QueryObject } from '../schemas/query.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { ObjectID } from '../../common/types/objectid.type';
import { Errors } from '../../common/enums/errors.enum';
import { DocumentType, Ref } from '@typegoose/typegoose/lib/types';

/**
 * Service for communicating with the Query database
 */
@Injectable()
export class QueryService {
	/**
	 * Dependency injection.
	 * @param queryModel Query typegoose entity
	 */
	constructor(
		@InjectModel(QueryObject)
		private readonly queryModel: ReturnModelType<typeof QueryObject>
	) {}
}
