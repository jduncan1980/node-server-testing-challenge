exports.up = function (knex) {
	return knex.schema.createTable('characters', (tbl) => {
		tbl.increments('id');
		tbl.string('name', 128).notNullable();
		tbl.string('show', 128).notNullable();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('characters');
};
