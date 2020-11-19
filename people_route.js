const people_router = require('express').Router();

const db = require('./queries');

people_router.get('/', db.getAllPeople);


module.exports = people_router;