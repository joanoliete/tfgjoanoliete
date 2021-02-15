import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { gql } from 'graphql-request';

let sessionToken;

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
		//Starting app
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('Favourite flights - Add', () => {
		test.todo('Favourite flights - Add');
	});

	it('Favourite flights - Get', () => {
		test.todo('Favourite flights - Get');
	});
});
