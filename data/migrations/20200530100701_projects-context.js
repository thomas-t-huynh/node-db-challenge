
exports.up = function(knex) {
    return knex.schema
        .createTable('contexts', tbl => {
            tbl.increments('id')
            tbl.string('name', 128).notNullable()
        })
        .createTable('tasks_contexts', tbl => {
            tbl.increments('id')
            tbl.integer('task_id')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('tasks')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            tbl.integer('context_id')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('contexts')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
        })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('contexts')
    .dropTableIfExists('tasks_contexts')
};
