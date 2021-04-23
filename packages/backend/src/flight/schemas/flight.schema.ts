import { Float, Int } from '@nestjs/graphql';
import { modelOptions, mongoose, prop } from '@typegoose/typegoose';

@modelOptions({ options: { allowMixed: 0 } })
export class Flight {
	@prop()
	id: string;

	@prop()
	flyFrom: string;

	@prop()
	flyTo: string;

	@prop()
	cityFrom: string;

	@prop()
	cityTo: string;

	@prop()
	cityCodeFrom: string;

	@prop()
	cityCodeTo: string;

	@prop()
	utc_departure?: string;

	@prop()
	utc_arrival?: string;

	@prop()
	distance: number;

	@prop()
	airlines: [string];

	@prop()
	price: number;
}
