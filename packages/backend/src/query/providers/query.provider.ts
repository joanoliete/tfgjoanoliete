import { Provider } from '@nestjs/common';
import { QueryResolver } from '../resolvers/query.resolver';
import { QueryService } from '../services/query.service';

export const QueryProviders: Provider[] = [QueryResolver, QueryService];
