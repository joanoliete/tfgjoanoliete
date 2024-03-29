import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModule } from '../user/users.module';
import { QueryController } from './controllers/query.controller';
import { QueryProviders } from './providers/query.provider';
import { QueryObject } from './schemas/query.schema';
import { QueryService } from './services/query.service';

@Module({
	imports: [TypegooseModule.forFeature([QueryObject]), UserModule],
	providers: [...QueryProviders],
	controllers: [QueryController],
	exports: [QueryService],
})
export class QueryModule {}
