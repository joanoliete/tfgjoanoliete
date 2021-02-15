import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Graphql type: Flights with all its data.
 */

@ObjectType()
export class Flight {
	@Field()
	_id: string;

	@Field({ nullable: true })
	createdAt: number;
}
