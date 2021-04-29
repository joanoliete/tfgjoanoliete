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
	route: [Route];

	@prop()
	airlines: [string];

	@prop()
	price: number;
}

export class Route {
	@prop()
	id?: string;

	@prop()
	flyFrom?: string;

	@prop()
	flyTo?: string;

	@prop()
	cityFrom?: string;

	@prop()
	cityCodeFrom?: string;

	@prop()
	cityTo?: string;

	@prop()
	cityCodeTo?: string;

	@prop()
	airline?: string;

	@prop()
	flight_no?: number;

	@prop()
	local_arrival?: string;

	@prop()
	utc_arrival?: string;

	@prop()
	local_departure?: string;

	@prop()
	utc_departure?: string;
}
