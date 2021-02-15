import { Module } from '@nestjs/common';
import { FlightController } from './controllers/flight.controller';
import { FlightProviders } from './provider/flight.provider';
import { FlightService } from './services/flight.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Flight } from './schemas/flight.schema';

@Module({
	imports: [TypegooseModule.forFeature([Flight])],
	providers: [...FlightProviders],
	controllers: [FlightController],
	exports: [FlightService],
})
export class FlightModule {}
