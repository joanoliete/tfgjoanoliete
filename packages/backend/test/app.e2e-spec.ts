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
		const queryobjects = db.collection('queryobjects');
		const trips = db.collection('trips');
		const destinations = db.collection('destinations');

		await db
			.collection('users')
			.deleteMany({ email: 'olietetejedor@gmail.com' });

		await flights.deleteMany({});
		await queryobjects.deleteMany({});
		await trips.deleteMany({});
		await destinations.deleteMany({});

		const mockUser = {
			_id: new mongoose.mongo.ObjectId('56cb91bdc3464f14678934ca'),
			email: 'olietetejedor@gmail.com',
		};
		await users.insertOne(mockUser);

		const insertedUser = await users.findOne({
			_id: mongoose.Types.ObjectId('56cb91bdc3464f14678934ca'),
		});
		expect(insertedUser).toEqual(mockUser);
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
				expect(body.data.query_history_find_all_of_user).toBeTruthy();
			});
	});

	it('Trips - Add trip to a user', async () => {
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				query: gql`
					mutation {
						trip_create_and_user_addition(
							email: "olietetejedor@gmail.com"
							tripData: {
								name: "Viatge"
								description: "Volta al món"
								destinations: []
							}
						)
					}
				`,
			})
			.expect(200);
	});

	//Va bé pero per testejarlo cal crear un mock al inici
	it('Trips - Modify one from a user', () => {
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				query: gql`
					query {
						trip_modify(
							tripId: "60438ee93e7e2826ccef83e3"
							tripData: {
								name: "ViatgeModificat"
								description: "Volta al món modificat"
							}
						)
					}
				`,
			})
			.expect(400);
	});

	it('Trips - Delete one of user', () => {
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				query: gql`
					mutation {
						user_trip_delete(
							email: "olietetejedor@gmail.com"
							tripId: "603fc4e8b1722d3bac533ea0"
						)
					}
				`,
			})
			.expect(200);
	});

	it('Trips - Get all from a user', () => {
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				query: gql`
					query {
						trip_find_all_of_user(email: "olietetejedor@gmail.com") {
							name
						}
					}
				`,
			})
			.expect(200)
			.expect(({ body }) => {
				expect(body.data.trip_find_all_of_user).toBeTruthy();
			});
	});

	it('Destination - Add destination to a user trip', async () => {
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				query: gql`
					mutation {
						destination_create_and_trip_addition(
							tripId: "604399d812b5f91b4cc33c0d"
							destinationData: {
								city: "Barcelona"
								aeroport: "BCN"
								arrival_date: "2017-01-22"
							}
						)
					}
				`,
			})
			.expect(200)
			.expect(({ body }) => {
				expect(body.errors[0].message).toBe('Trip does not exist');
			});
	});

	it('Destination - Delete destination to a user trip', async () => {
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				query: gql`
					mutation {
						user_trip_destination_delete(
							tripId: "604399d812b5f91b4cc33c0d"
							destinationId: "6044d9f9e60dc23bd0ac3351"
						)
					}
				`,
			})
			.expect(200)
			.expect(({ body }) => {
				expect(body.errors[0].message).toBe('Trip does not exist');
			});
	});

	it('Destination - Modify one from a user trip', () => {
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				query: gql`
					query {
						trip_modify(
							tripId: "60438ee93e7e2826ccef83e3"
							tripData: {
								name: "ViatgeModificat"
								description: "Volta al món modificat"
							}
						)
					}
				`,
			})
			.expect(400);
	});

	afterAll(async () => {
		await app.close();
		mongoose.disconnect();
		await connection.close();
	});
});
