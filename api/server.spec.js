const server = require('./server');
const request = require('supertest');
const db = require('../database/dbConfig');

describe('server', () => {
	it('should run in a testing environment', () => {
		expect(process.env.DB_ENV).toBe('testing');
	});

	describe('GET /', () => {
		it('should return status 200', async () => {
			const res = await request(server).get('/');
			expect(res.status).toBe(200);
		});

		it('should return json', async () => {
			const res = await request(server).get('/');
			console.log(res.body);
			expect(res.type).toBe('application/json');
		});

		it('should return "Server Is Running."', async () => {
			const res = await request(server).get('/');
			expect(res.body).toEqual({ message: 'Server is Running.' });
		});
	});

	describe('GET /api', () => {
		beforeEach(async () => {
			await db('characters').truncate();
		});

		it('should return status 200', async () => {
			const res = await request(server).get('/api');
			expect(res.status).toBe(200);
		});

		it('should return json', async () => {
			const res = await request(server).get('/api');
			expect(res.type).toBe('application/json');
		});

		it('should return an array', async () => {
			const res = await request(server).get('/api');
			expect(res.body).toBeInstanceOf(Array);
		});

		it('should have length of 1 after adding 1 character', async () => {
			await request(server).post('/api').send({
				name: 'Balki',
				show: 'Perfect Strangers',
			});
			const res = await request(server).get('/api');

			expect(res.body).toHaveLength(1);
		});
	});

	describe('POST /api', () => {
		beforeEach(async () => {
			await db('characters').truncate();
		});

		it('should return status 201', async () => {
			const res = await request(server).post('/api').send({
				name: 'Balki',
				show: 'Perfect Strangers',
			});
			expect(res.status).toBe(201);
		});

		it('should return the newly created character', async () => {
			const newChar = await request(server).post('/api').send({
				name: 'Balki',
				show: 'Perfect Strangers',
			});
			const res = await request(server).get('/api');

			expect(res.body[0]).toEqual(newChar.body);
		});

		it('should send 400 if req missing character', async () => {
			const res = await request(server).post('/api').send({
				name: 'Balki',
			});
			expect(res.body).toEqual({
				statusCode: 400,
				message: 'Please provide a show and character.',
			});
		});

		it('should send 400 if req missing show', async () => {
			const res = await request(server).post('/api').send({
				show: 'Perfect Strangers',
			});
			expect(res.body).toEqual({
				statusCode: 400,
				message: 'Please provide a show and character.',
			});
		});
	});
	describe('DELETE /api', () => {
		beforeEach(async () => {
			await db('characters').truncate();
			await request(server).post('/api').send({
				name: 'Balki',
				show: 'Perfect Strangers',
			});
		});

		it('should send status code 200', async () => {
			const deletedChar = await request(server).delete('/api/1');
			expect(deletedChar.status).toBe(200);
		});

		it('should delete the character with the provided id', async () => {
			const deletedChar = await request(server).delete('/api/1');
			const res = await request(server).get('/api');

			expect(res.body).toHaveLength(0);
			expect(deletedChar.body).toEqual({
				id: 1,
				name: 'Balki',
				show: 'Perfect Strangers',
			});
		});

		it('should not delete a character if not provided with proper id', async () => {
			const res = await request(server).delete('/api/3');
			expect(res.status).toBe(404);
			const res2 = await request(server).get('/api');
			expect(res2.body).toHaveLength(1);
		});
	});
});
