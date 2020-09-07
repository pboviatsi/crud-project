//στοιχεία σύνδεσης της βάση δεδομένων
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'qyiqgpykypjvva',
    host: 'ec2-54-75-150-32.eu-west-1.compute.amazonaws.com',
    database: 'd6cvoliqhemaap',
    password: 'a34cf770ac97ee8609800b95596c06902db25fa3b65bc9cfcbbba8099c1e9358',
    port: 5432,
    ssl:true
});

module.exports = pool;
