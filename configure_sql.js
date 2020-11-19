const {Pool} = require('pg');
const pool = new Pool({
    user: 'api_user',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432
});

module.exports = pool;