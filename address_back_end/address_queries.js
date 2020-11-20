const pool = require('../configure_sql');

const getAllAddress = (req, res) => {
    pool.query('SELECT * FROM address ORDER BY id', (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results.rows);
    })
}

const getSingleAddress = (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM address WHERE id = $1', [id], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results.rows);
    })
}

const createSingleAddress = (req, res) => {
    const {street_number, street_name, suit_type, number_suit, zip_code, person_id} = req.body;
    pool.query('INSERT INTO address (street_number, street_name, suit_type, number_suit, zip_code, person_id)' +
    'VALUES ($1, $2, $3, $4, $5, $6)', [street_number, street_name, suit_type, number_suit, zip_code, person_id], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(`you created address for ${person_id}`);
    })
}

const updateAddress = (req, res) => {
    const {street_number, street_name, suit_type, number_suit, zip_code, person_id} = req.body;
    const id = req.params.id;
    pool.query('UPDATE address SET street_number = $1, street_name = $2, suit_type = $3, number_suit = $4, zip_code = $5 WHERE person_id = $6',
    [street_number, street_name, suit_type, number_suit, zip_code, id], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(`you have updated address for person with id:${id}`);
    })
}

const deleteAddress = (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM address WHERE id = $1', [id], (err, results) => {
        res.send(`you have deleted address with id:${id}`);
    })
}

module.exports = {
    getAllAddress,
    getSingleAddress,
    createSingleAddress,
    updateAddress,
    deleteAddress
}