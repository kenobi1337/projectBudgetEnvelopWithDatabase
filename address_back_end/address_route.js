const address_router = require('express').Router();
const address_db = require('./address_queries');

address_router.get('/', address_db.getAllAddress);
address_router.get('/:id', address_db.getSingleAddress);
address_router.post('/', address_db.createSingleAddress);
address_router.put('/:id', address_db.updateAddress);
address_router.delete('/:id', address_db.deleteAddress);

module.exports = address_router;