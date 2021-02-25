import { Provider } from '@nestjs/common';
import { UserResolver } from '../resolvers/user.resolver';
import { UserService } from '../services/user.service';

export const UserProviders: Provider[] = [UserResolver, UserService];
