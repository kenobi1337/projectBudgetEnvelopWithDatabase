const pool  = require('../configure_sql');

const getBudgets = (req, res) => {
    pool.query('SELECT * FROM budget ORDER BY id', (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results.rows);
    })
}

const getSingleBudget = (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM budget WHERE id = $1', [id], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results.rows);
    })
}

const createBudget = (req, res) => {
    const {name, budget, id} = req.body;
    pool.query('INSERT INTO budget (name, budget, person_id)' +
    'VALUES ($1, $2, $3)', 
    [name, budget, id], (err, results) => {
        res.status(201).send(`you created new budget with an Id:${id}`);
    })
}

const updateBudget = (req, res) => {
    const id = req.params.id;
    const {name, budget} = req.body;
    pool.query('UPDATE budget SET name = $1, budget = $2 WHERE id = $3', [name, budget, id], (err, results) => {
        res.send(`you have successful updated the budget with id:${id}`);
    })
}

const deleteBudget = (req, res) => {
    const id = req.params.id;
    pool.query('DELETE budget WHERE id = $1', [id], (err, results) => {
        res.status(204).send(`you have deleted budget with id:${id}`);
    })
}

module.exports = {
    getBudgets,
    getSingleBudget,
    createBudget,
    updateBudget,
    deleteBudget
}