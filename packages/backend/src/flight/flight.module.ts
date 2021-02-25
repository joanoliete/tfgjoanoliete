import { Module } from '@nestjs/common';
import { FlightController } from './controllers/flight.controller';
import { FlightProviders } from './providers/flight.provider';
import { FlightService } from './services/flight.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Flight } from './schemas/flight.schema';
import { UserModule } from '../user/users.module';

@Module({
	imports: [TypegooseModule.forFeature([Flight]), UserModule],
	providers: [...FlightProviders],
	controllers: [FlightController],
	exports: [FlightService],
})
export class FlightModule {}
