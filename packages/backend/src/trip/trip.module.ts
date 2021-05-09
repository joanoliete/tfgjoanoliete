import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Flight } from 'src/flight/schemas/flight.schema';
import { UserModule } from '../user/users.module';
import { TripController } from './controller/trip.controller';
import { TripProviders } from './providers/trip.provider';
import { Destination, Trip } from './schemas/trip.schema';
import { TripService } from './services/trip.service';

@Module({
	imports: [
		TypegooseModule.forFeature([Trip]),
		TypegooseModule.forFeature([Destination]),
		TypegooseModule.forFeature([Flight]),
		UserModule,
	],
	providers: [...TripProviders],
	controllers: [TripController],
	exports: [TripService],
})
export class TripModule {}
