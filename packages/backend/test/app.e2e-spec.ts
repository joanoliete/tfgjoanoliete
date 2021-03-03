import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { gql } from 'graphql-request';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { connect, disconnect } from 'mongoose';
import { mongoose } from '@typegoose/typegoose';
import { MongoClient } from 'mongodb';
require('dotenv/config');

let sessionToken;

describe('All tests (e2e)', () => {
	let app: INestApplication;
	let connection;
	let db;

	beforeEach(async () => {
		//Setting up Database
		connection = await MongoClient.connect(process.env.DATABASE_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		db = await connection.db();

		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/ (GET)', () => {
		return request(app.getHttpServer()).get('/flight').expect(404);
	});

	//Can nextAuth be tested? Does it need to be inicialized and be passed as a header?
	it('Mocking registering a user', async () => {
		const users = db.collection('users');
		const flights = db.collection('flights');

		await db
			.collection('users')
			.deleteMany({ email: 'olietetejedor@gmail.com' });

		await db.collection('flights').deleteMany({});

		await db.collection('queryobjects').deleteMany({});

		const mockUser = {
			_id: new mongoose.mongo.ObjectId('56cb91bdc3464f14678934ca'),
			email: 'olietetejedor@gmail.com',
		};
		await users.insertOne(mockUser);

		const insertedUser = await users.findOne({
			_id: mongoose.Types.ObjectId('56cb91bdc3464f14678934ca'),
		});
		expect(insertedUser).toEqual(mockUser);

		/*const mockFlight = {
			_id: new mongoose.mongo.ObjectId('60cb91bdc3464f14678934ca'),
			url_reference: 'http://hola.com',
			fly_from: 'BCN',
			fly_to: 'MDR',
			date_from: '1990/07/15',
			date_to: '1990/07/15',
			adults: 4,
			children: 4,
			price: 4.0,
		};
		await flights.insertOne(mockFlight);
		*/
	});

	it('Favourite flights - Add one to a user', async () => {
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				query: gql`
					mutation {
						flight_create_and_user_addition(
							email: "olietetejedor@gmail.com"
							flightData: {
								url_reference: "http://link.com"
								fly_from: "BCN"
								fly_to: "MDR"
								date_from: "1990/07/15"
								date_to: "1990/07/15"
								adults: 4
								children: 4
								price: 4.0
							}
						)
					}
				`,
			})
			.expect(200);
	});

	it('Favourite flights - Delete one from a user', () => {
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				query: gql`
					mutation {
						user_favourite_flight_delete(
							email: "olietetejedor@gmail.com"
							url_reference: "http://link.com"
						)
					}
				`,
			})
			.expect(200);
	});

	it('Favourite flights - Get all from a user', () => {
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				query: gql`
					query {
						favourite_flights_by_user_find_all(
							email: "olietetejedor@gmail.com"
						) {
							url_reference
						}
					}
				`,
			})
			.expect(200)
			.expect(({ body }) => {
				expect(body.data.favourite_flights_by_user_find_all).toBeTruthy();
			});
	});

	it('Query history - Add one from a user', async () => {
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				query: gql`
					mutation {
						query_create_and_user_addition(
							email: "olietetejedor@gmail.com"
							queryData: {
								departure_ap: "MDR"
								arrival_ap: "BCN"
								departure_date: "1990/07/15"
								arrival_date: "1990/07/15"
								adults: 4
							}
						)
					}
				`,
			})
			.expect(200);
	});

	it('Query history - Delete one of user', () => {
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				query: gql`
					mutation {
						user_history_query_delete(
							email: "olietetejedor@gmail.com"
							queryId: "603fc4e8b1722d3bac533ea0"
						)
					}
				`,
			})
			.expect(200);
	});

	it('Query history - Get all from a user', () => {
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				query: gql`
					query {
						query_history_find_all_of_user(email: "olietetejedor@gmail.com") {
							departure_ap
						}
					}
				`,
			})
			.expect(200)
			.expect(({ body }) => {
				expect(body.data).toBeNull();
			});
	});

	afterAll(async () => {
		await app.close();
		mongoose.disconnect();
		await connection.close();
	});
});
