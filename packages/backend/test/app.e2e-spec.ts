import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { gql } from 'graphql-request';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { connect } from 'mongoose';

let sessionToken;

const replSet = new MongoMemoryReplSet({
	replSet: { storageEngine: 'wiredTiger', name: 'tfgjoanoliete' },
	instanceOpts: [
		{
			port: 27018,
		},
	],
});

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/ (GET)', () => {
		return request(app.getHttpServer()).get('/flight/').expect(200);
	});
});

describe('User (e2e)', () => {
	let app: INestApplication;

	beforeAll(async () => {
		//Starting app
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	//Can nextAuth be tested? Does it need to be inicialized and be passed as a header?
	it('User - Login', () => {
		test.todo('User - Login');
	});
});

describe('Favourite flights (e2e)', () => {
	let app: INestApplication;

	beforeAll(async () => {
		//Setting up Database
		await replSet.waitUntilRunning();
		const uri = await replSet.getUri();
		connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});
		process.env.DATABASE_URI = uri;

		//Starting app
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('Favourite flights - Add', async () => {
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				query: gql`
					mutation {
						flight_create_and_user_addition(
							input: {
								url_reference: "http://hola.com"
								fly_from: "BCN"
								fly_to: "MDR"
								date_from: "1990/07/15"
								date_to: "1990/07/15"
								adults: 4
								children: 4
								price: 4.0
							}
						) {
							url_reference
							fly_from
							fly_to
							date_from
							date_to
							adults
							children
							price
							createdAt
						}
					}
				`,
			})
			.expect(200);
	});

	it('Favourite flights - Get all', () => {
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				query: gql`
					query {
						favourite_flights_by_user_find_all(userId: "1") {
							_id
						}
					}
				`,
			})
			.expect(200)
			.expect(({ body }) => {
				expect(body.data.user.savedFlights).toBeTruthy();
			});
	});
});
