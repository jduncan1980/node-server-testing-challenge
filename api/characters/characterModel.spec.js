const { get, add, remove, getById } = require('./characterModel');
const db = require('../../database/dbConfig');

describe('Characters Model', () => {
	describe('get', () => {
		beforeEach(async () => {
			await db('characters').truncate();
		});
		it('returns an array of correct length', async () => {
			await db('characters').insert({
				name: 'Balki',
				show: 'Perfect Strangers',
			});
			let res = await get();
			expect(res).toHaveLength(1);

			await db('characters').insert({
				name: 'Joey',
				show: 'Blossom',
			});
			res = await get();
			expect(res).toHaveLength(2);
		});
	});

	describe('add', () => {
		beforeEach(async () => {
			await db('characters').truncate();
		});
		it('returns the added character with ID', async () => {
			const res = await add({
				name: 'Balki',
				show: 'Perfect Strangers',
			});
			expect(res).toEqual({
				id: 1,
				name: 'Balki',
				show: 'Perfect Strangers',
			});
		});
	});

	describe('remove', () => {
		beforeEach(async () => {
			await db('characters').truncate();
			await db('characters').insert({
				name: 'Joey',
				show: 'Blossom',
			});
		});

		it('receives back the deleted character', async () => {
			const deleted = await remove(1);
			expect(deleted).toEqual({ id: 1, name: 'Joey', show: 'Blossom' });
		});

		it('returns an empty array once characters deleted', async () => {
			await remove(1);
			const res = await db('characters');
			expect(res).toHaveLength(0);
		});
	});

	describe('getById', () => {
		beforeEach(async () => {
			await db('characters').truncate();
			await db('characters').insert({
				name: 'Joey',
				show: 'Blossom',
			});
		});

		it('should get the correct character when given an id', async () => {
			const res = await getById(1);
			expect(res).toEqual({ id: 1, name: 'Joey', show: 'Blossom' });
		});
	});
});
