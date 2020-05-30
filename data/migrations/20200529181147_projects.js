
exports.up = function(knex) {
    return knex.schema
        .createTable('projects', tbl => {
            tbl.increments('id')
            tbl.string('name', 128).notNullable()
            tbl.string('description', 128)
            tbl.boolean('completed').defaultTo(false)
        })
        .createTable('tasks', tbl => {
            tbl.increments('id')
            tbl.string('description', 128).notNullable()
            tbl.string('note', 128)
            tbl.boolean('completed').defaultTo(false)
            tbl.integer('project_id')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('projects')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
        })
        .createTable('resources', tbl => {
            tbl.increments('id')
            tbl.string('name', 128).notNullable()
            tbl.string('description', 128)
        })
        .createTable('projects_resources', tbl => {
            tbl.increments('id')
            tbl.integer('project_id')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('projects')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            tbl.integer('resource_id')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('resources')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
        })

};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('projects')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects_resources')
};
