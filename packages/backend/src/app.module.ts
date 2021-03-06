import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypegooseModule } from 'nestjs-typegoose';
import { join } from 'path';
import { FlightModule } from './flight/flight.module';
import { QueryModule } from './query/query.module';
import { TripModule } from './trip/trip.module';
import { UserModule } from './user/users.module';

@Module({
	imports: [
		GraphQLModule.forRoot({
			definitions: {
				path: join(process.cwd(), '/src/graphql.schema.d.ts'),
				outputAs: 'class',
			},
			playground: true,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			introspection: true,
			resolverValidationOptions: {
				requireResolversForResolveType: false,
			},
		}),
		TypegooseModule.forRoot(
			'mongodb+srv://admin:admin@cluster0.lco4k.mongodb.net/tfgjoanoliete?retryWrites=true&w=majority',
			{ useNewUrlParser: true }
		),
		FlightModule,
		UserModule,
		QueryModule,
		TripModule,
	],
})
export class AppModule {}
