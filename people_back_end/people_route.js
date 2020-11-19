const people_router = require('express').Router();

const people_db = require('./people_queries');
people_router.param(':id', people_db.idParams);
people_router.get('/', people_db.getAllPeople);
people_router.get('/:id', people_db.getSinglePerson);
people_router.put('/:id', people_db.updatePersonInfo);
people_router.post('/', people_db.createNewPerson);
people_router.delete('/:id', people_db.deletePerson);

module.exports = people_router;