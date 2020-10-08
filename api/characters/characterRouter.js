const express = require('express');
const router = express.Router();
const characters = require('./characterModel');

router.get('/', async (req, res, next) => {
	try {
		const response = await characters.get();
		res.status(200).json(response);
	} catch (error) {
		next({ statusCode: 500, message: 'Something went wrong...' });
	}
});

router.post('/', async (req, res, next) => {
	if (req.body.name && req.body.show) {
		try {
			const char = req.body;
			const response = await characters.add(char);
			res.status(201).json(response);
		} catch (error) {
			next({ statusCode: 500, message: 'Something went wrong...' });
		}
	} else {
		next({ statusCode: 400, message: 'Please provide a show and character.' });
	}
});

router.delete('/:id', async (req, res, next) => {
	const id = req.params.id;
	try {
		const response = await characters.remove(id);
		if (response) {
			res.status(200).json(response);
		} else {
			next({ statusCode: 404, message: 'Character not found.' });
		}
	} catch (error) {
		next({ statusCode: 500, message: 'Something went wrong...' });
	}
});

module.exports = router;
