import { Provider } from '@nestjs/common';
import { FlightResolver } from '../resolvers/flight.resolver';
import { FlightService } from '../services/flight.service';

export const FlightProviders: Provider[] = [FlightResolver, FlightService];
