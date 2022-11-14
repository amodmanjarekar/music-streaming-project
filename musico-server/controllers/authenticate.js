
const session = require('express-session');

function isAuthenticate(req, res, next){
    if(req.session.userId===undefined || req.session.userId===null){
        // res.status(200);
        // console.log("not authenticated");
        res.send({
            status: "not logged in"
        })
   }
    else{
        // res.status(401);              // unauthorized
        next();
    }
}

module.exports = isAuthenticate;