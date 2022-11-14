require('dotenv').config();

const mysql = require('mysql');


var con = mysql.createConnection({                   // create connection to database
    host: 'localhost',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});


module.exports = con;