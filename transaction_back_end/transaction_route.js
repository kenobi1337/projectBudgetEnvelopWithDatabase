const transaction_router = require('express').Router();

const transaction_db = require('./transaction_queries');

transaction_router.get('/', transaction_db.getAllTransaction);
transaction_router.get('/:id', transaction_db.getSingleTransaction);
transaction_router.post('/:from_id/to/:to_id', transaction_db.createTransaction);
transaction_router.put('/:id', transaction_db.updateTransaction);
transaction_router.delete('/:id', transaction_db.deleteTransaction);


module.exports = transaction_router;