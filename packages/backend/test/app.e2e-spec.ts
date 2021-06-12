import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { gql } from 'graphql-request';
import { mongoose } from '@typegoose/typegoose';
import { MongoClient } from 'mongodb';
require('dotenv/config');

describe('All tests (e2e)', () => {
	let app: INestApplication;
	let connection;
	let db;

	beforeEach(async () => {
		//Setting up Database
		connection = await MongoClient.connect(process.env.DATABASE_URI_TESTING, {
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

	it('Mock user', async () => {
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
								id: "01af032d496800001353250e_0|032d0a2249690000b759e9e3_0"
								flyFrom: "BCN"
								flyTo: "MAD"
								cityFrom: "Barcelona"
								cityCodeFrom: "BCN"
								cityTo: "Madrid"
								cityCodeTo: "MAD"
								distance: 483.25
								price: 20
								airlines: ["FR"]
								route: [
									{
										id: "01af032d496800001353250e_0"
										flyFrom: "BCN"
										flyTo: "STN"
										cityFrom: "Barcelona"
										cityCodeFrom: "BCN"
										cityTo: "London"
										cityCodeTo: "LON"
										airline: "FR"
										flight_no: 9815
										local_arrival: "2021-06-14T20:35:00.000Z"
										utc_arrival: "2021-06-14T19:35:00.000Z"
										local_departure: "2021-06-14T19:15:00.000Z"
										utc_departure: "2021-06-14T17:15:00.000Z"
									}
									{
										id: "032d0a2249690000b759e9e3_0"
										flyFrom: "STN"
										flyTo: "MAD"
										cityFrom: "London"
										cityCodeFrom: "LON"
										cityTo: "Madrid"
										cityCodeTo: "MAD"
										airline: "FR"
										flight_no: 5992
										local_arrival: "2021-06-15T09:45:00.000Z"
										utc_arrival: "2021-06-15T07:45:00.000Z"
										local_departure: "2021-06-15T06:25:00.000Z"
										utc_departure: "2021-06-15T05:25:00.000Z"
									}
								]
								utc_arrival: "2021-06-15T07:45:00.000Z"
								utc_departure: "2021-06-14T17:15:00.000Z"
								deep_link: "www.google.com"
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
							id: "01af032d496800001353250e_0|032d0a2249690000b759e9e3_0"
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
							id
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
					query {
						query_create_and_user_addition(
							email: "olietetejedor@gmail.com"
							context: {
								departure_ap: "BCN"
								arrival_ap: "MAH"
								departure_date: "2021-06-13T10:56:01.982Z"
								adults: 1
							}
						) {
							id
						}
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
			.expect(200)
			.expect(({ body }) => {
				expect(body.errors[0].message).toBe('Query does not exist');
			});
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

	it('Trips - Modify one from a user', () => {
		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				query: gql`
					mutation {
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
			.expect(200)
			.expect(({ body }) => {
				expect(body.errors[0].message).toBe('Trip not found');
			});
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
			.expect(200)
			.expect(({ body }) => {
				expect(body.errors[0].message).toBe('Trip does not exist');
			});
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

	afterAll(async () => {
		await app.close();
		mongoose.disconnect();
		await connection.close();
	});
});
