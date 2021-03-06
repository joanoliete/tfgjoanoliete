import { Controller, Get } from '@nestjs/common';
import { Trip } from '../schemas/trip.schema';
import { TripService } from '../services/trip.service';

@Controller('trip')
export class TripController {
	constructor(private readonly tripService: TripService) {}
}
