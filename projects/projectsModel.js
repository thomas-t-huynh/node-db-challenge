const db = require('../data/dbconfig')

module.exports = {
    addResource,
    getResources,
    addProject,
    getProjects,
    addTask,
    getTasks
}

function addResource(resource) {
    return db('resources').insert(resource)
}

function getResources() {
    return db('resources')
}

function addProject(project) {
    return db('projects').insert(project)
}

function getProjects() {
    return db('projects')
}

function addTask(task) {
    return db('tasks').insert(task)
}

function getTasks(id) {
    return db('tasks as t')
        .join('projects as p', 't.project_id', 'p.id')
        .where('t.project_id', id)
        .select('p.name', 'p.description', 't.description', 't.note', 't.completed')
}