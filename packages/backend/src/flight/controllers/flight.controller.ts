import { Controller, Get } from '@nestjs/common';
import { ObjectID } from 'src/common/types/objectid.type';
import { Flight } from '../schemas/flight.schema';
import { FlightService } from '../services/flight.service';

@Controller('flight')
export class FlightController {
	constructor(private readonly flightService: FlightService) {}

	@Get('/')
	async findAll(userId: ObjectID): Promise<Flight[]> {
		return await this.flightService.findAllFavouritesByUser(userId);
	}
}
