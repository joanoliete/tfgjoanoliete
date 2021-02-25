import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserController } from './controllers/user.controller';
import { UserProviders } from './providers/user.provider';
import { User } from './schemas/user.schema';
import { UserService } from './services/user.service';

@Module({
	imports: [TypegooseModule.forFeature([User])],
	providers: [...UserProviders],
	controllers: [UserController],
	exports: [UserService],
})
export class UserModule {}
