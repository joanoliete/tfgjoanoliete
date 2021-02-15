import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class FlightCreateDto {
	@Field()
	id: string;

	@Field({ nullable: true })
	createdAt: number;
}
