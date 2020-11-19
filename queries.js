const pool = require('./configure_sql');

const getAllPeople = (req, res) => {
    pool.query('SELECT * FROM people', (err, results) => {
        if(err) {
            throw err;
        }
        res.send(results.rows);
    })
}

module.exports = {
    getAllPeople
}