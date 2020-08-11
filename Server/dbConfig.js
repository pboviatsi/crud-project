//στοιχεία σύνδεσης της βάση δεδομένων
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'crud-project',
    password: 'penny@bove',
    port: 5432
});

module.exports = pool;
