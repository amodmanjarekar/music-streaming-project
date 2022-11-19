require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const session = require('express-session');

const con = require('./controllers/dbConnection.js');
const userRoutes = require('./routes/user.routes');
const home = require('./routes/home.routes.js');

const app = express();


app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true, 
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }
}))




// app.get("/", async (req, res)=>{
//     let sql = "select * from song";
//     let results;

//     await con.query(sql, async (e,r,f)=>{              // r is an array of objects of RowDataPacket and r[i] is the ith object r[i].prop ...
//         if(e) throw e;
//         else{
//             results= JSON.parse(JSON.stringify(r));           // results[i] is object
//         }
//         res.send(results);
//     })
// });


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



