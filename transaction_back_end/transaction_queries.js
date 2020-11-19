const pool = require('../configure_sql');

const getAllTransaction = (req, res) => {
    pool.query('SELECT * FROM transaction ORDER BY id', (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results.rows);
    })
}

const getSingleTransaction = (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM transaction WHERE id = $1', [id], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results.rows);
    })
}

const createTransaction = (req, res) => {
    const {date, amount, recipient, sender} = req.body;
    const from_id = req.params.from_id;
    const to_id = req.params.to_id;
    pool.query('INSERT INTO transaction (date, amount, recipient, sender, from_id, to_id)' +
    'VALUES ($1, $2, $3, $4, $5, $6)', [date, amount, recipient, sender, from_id, to_id], (err, results) => {
        res.send(`person with id${from_id} have sent ${amount} to person with id${to_id}`);
    })
}

const updateTransaction = (req, res) => {
    const {date, amount, recipient, sender} = req.body;
    const id = req.params.id;
    pool.query('UPDATE transaction SET date = $1, amount = $2, recipient = $3, sender = $4 WHERE id = $5', 
    [date, amount, recipient, sender, id], (err, results) => {
        res.send(`you have update transaction record of ${id}`);
    })
}

const deleteTransaction = (req, res) => {
    const id = req.params.id;
    pool.query('DELETE transaction WHERE id = $1', [id], (err, results) => {
        res.send(`you have deleted transaction record with id${id}`);
    })
}

module.exports = {
    getAllTransaction,
    getSingleTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction
}