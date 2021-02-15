import { prop } from '@typegoose/typegoose';

export class Flight {
	@prop({ required: true, unique: true })
	_id: string;

	@prop({ default: null })
	createdAt: number;
}
