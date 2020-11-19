const pool = require('../configure_sql');

const idParams = (req, res, next, ID) => {
    req.id = req.params.id;
    next();
}

const getAllPeople = (req, res) => {
    pool.query('SELECT * FROM people ORDER BY id', (err, results) => {
        if(err) {
            throw err;
        }
        res.send(results.rows);
    })
}

const getSinglePerson = (req, res) => {
    pool.query('SELECT * FROM people WHERE id = $1', [req.id], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results.rows);
    })
}

const updatePersonInfo = (req, res) => {
    const {name, email} = req.body;
    pool.query('UPDATE people SET name = $1, email = $2 WHERE id = $3', [name, email, req.id], (err, results) => {
        if(err) {
            throw err;
        }
        res.send(`you have updated person with id: ${req.id}, you may get router to see the result`);
    })
}

const createNewPerson = (req, res) => {
    const {name, email} = req.body;
    pool.query('INSERT INTO people (name, email)' 
    + 'VALUES ($1, $2)',
    [name, email], (err, results) => {
        if(err) {
            throw err;
        }
        res.status(201).send('you have successful created new person record');
    })
}

const deletePerson = (req, res) => {
    pool.query('DELETE people WHERE id = $1', [req.id], (err, results) => {
        res.status(204).send(`you have deleted person with id:${req.id}`);
    })
}

module.exports = {
    idParams,
    getAllPeople,
    getSinglePerson,
    updatePersonInfo,
    createNewPerson,
    deletePerson
}