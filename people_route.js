const people_router = require('express').Router();

const db = require('./queries');
people_router.param(':id', db.idParams);
people_router.get('/', db.getAllPeople);
people_router.get('/:id', db.getSinglePerson);
people_router.put('/:id', db.updatePersonInfo);
people_router.post('/', db.createNewPerson);
people_router.delete('/:id', db.deletePerson);

module.exports = people_router;