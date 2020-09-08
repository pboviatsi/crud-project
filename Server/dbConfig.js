//στοιχεία σύνδεσης της βάση δεδομένων
const Pool = require('pg').Pool;
exports.pool = new Pool({
    connectionString:'postgres://qyiqgpykypjvva:a34cf770ac97ee8609800b95596c06902db25fa3b65bc9cfcbbba8099c1e9358@ec2-54-75-150-32.eu-west-1.compute.amazonaws.com:5432/d6cvoliqhemaap'
});
