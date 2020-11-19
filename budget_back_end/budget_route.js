const budget_router = require('express').Router();
const budget_db = require('./budget_queries');

budget_router.get('/', budget_db.getBudgets);
budget_router.get('/:id', budget_db.getSingleBudget);
budget_router.post('/', budget_db.createBudget);
budget_router.put('/:id', budget_db.updateBudget);
budget_router.delete('/:id', budget_db.deleteBudget);


module.exports = budget_router;