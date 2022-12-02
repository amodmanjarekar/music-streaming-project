require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const session = require('express-session');
// const passport = require('passport');
const cookieParser = require('cookie-parser');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors());


const day = 1000*60*60*24;
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true, 
    saveUninitialized: true,
    cookie:{ secure: false},
    auth:false
}))



const con = require('./controllers/dbConnection.js');
const userRoutes = require('./routes/user.routes');
const home = require('./routes/home.routes.js');




app.use('/', home);
app.use('/user', userRoutes);


// con.end();




// const errorHandler ...



// routes

// error handler middleware



// checking 







app.listen(process.env.PORT, ()=>{
    console.log("Connection formed...\nClick",  `http://localhost:${process.env.PORT}`);
}); 



