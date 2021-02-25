import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { Errors } from '../enums/errors.enum';
import { ObjectID } from '../types/objectid.type';

/**
 * ObjectID validation
 */
@Injectable()
export class ObjectIDPipe implements PipeTransform {
	/**
	 * ObjectID validation method
	 *
	 * @param  {ObjectID}
	 * @returns ObjectID
	 */
	transform(value: string): ObjectID {
		if (!isValidObjectId(value))
			throw new BadRequestException(Errors.INVALID_OBJECTID);

		return value;
	}
}
