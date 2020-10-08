const db = require('../../database/dbConfig');

const getById = (id) => {
	return db('characters').where({ id }).first();
};

const add = async (char) => {
	try {
		const id = await db('characters').insert(char, 'id');
		return getById(id);
	} catch (error) {
		throw error;
	}
};

const remove = async (id) => {
	try {
		const response = await getById(id);
		await db('characters').where({ id }).del();
		return response;
	} catch (error) {
		throw error;
	}
};

const get = () => {
	return db('characters');
};

module.exports = {
	get,
	add,
	remove,
	getById,
};
