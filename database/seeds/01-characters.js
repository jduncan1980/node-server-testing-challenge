exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('table_name')
		.truncate()
		.then(function () {
			// Inserts seed entries
			return knex('table_name').insert([
				{ id: 1, name: 'Balki', show: 'Perfect Strangers' },
				{ id: 2, name: 'Joey', show: 'Blossom' },
				{ id: 3, name: 'Captain Picard', show: 'Star Trek: TNG' },
				{ id: 4, name: 'Dana Scully', show: 'The X-Files' },
			]);
		});
};
