
// const session = require('express-session');
const express = require('express')

function isAuthenticate(req, res, next){

    console.log(req.session);
    if(req.session && req.session.auth===true) next();
    else res.send(false);

    // if(req.session && (req.session.userId!=undefined || req.session.userId!=null)) next();
    // else res.send(false);

    // if(req.session.userId===undefined || req.session.userId===null){
    //     res.send(false);
    // }
    // else{
    //     next();
    // }
}

module.exports = isAuthenticate;