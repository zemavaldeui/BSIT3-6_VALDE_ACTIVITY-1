const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'registration'   // or whatever your DB name is
});


module.exports = conn;   // this line is essential — without it, app.js gets nothing