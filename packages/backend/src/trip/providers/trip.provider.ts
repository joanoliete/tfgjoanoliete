import { Provider } from '@nestjs/common';
import { TripResolver } from '../resolvers/trip.resolver';
import { TripService } from '../services/trip.service';

export const TripProviders: Provider[] = [TripResolver, TripService];
