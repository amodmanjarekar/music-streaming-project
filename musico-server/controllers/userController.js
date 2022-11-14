
const con = require('./dbConnection');



exports.login = function(req, res, next){
    // username password
    let username = req.body.username;
    let password = req.body.password;

    let sql =`select user_id, name, email, username from users where username=${username} and hash_password=${password}`;
    con.query(sql, (err, result, fields)=>{
        if(err) throw err;
        else{
            if(result.length!=0){
                result = JSON.parse(JSON.stringify(result));
                req.session.userId = result[0].user_id;
                res.send(result);
            }
            else{
                res.send({
                    status: "invalid credentials"
                })
            }
        }
    })
}


exports.logout = function(req, res, next){
    req.session.destroy();
    res.send({
        status: "successfully logged out"
    });
}


exports.register = function(req, res, next){
    let username = req.body.username;
    let password = req.body.password;
    let name = req.body.name;
    let email = req.body.email;
    
    let sql = `insert into users(name, email, username, hash_password) values (${name}, ${email}, ${username}, ${password})`;

    con.query(sql, async (err, result, fields)=>{
        if(err) throw err;
        else{
            result = JSON.parse(JSON.stringify(result));
            req.session.userId = result.insertId;            // saving session;
            res.send({
                status: "successful",                       // successful registration
                user_id: (1000+result.insertId)              // user_id
            })
        }
    })


}


exports.getProfile = function(req, res, next){
        const user_id = req.session.userId;
        console.log("user_id:", user_id);
        
        let sql = `select * from users where user_id = ${user_id}`;
        con.query(sql, (err, result, fields)=>{
            if(err) throw err;
            else{
                result = JSON.parse(JSON.stringify(result));
                res.send(result);
            }
        })
}


exports.getSongs = function(req, res, next){

    let sql = `select * from song where artist=${req.session.userId}`;
    con.query(sql, (err, result, fields)=>{
        if(err) throw err;
        else{
            result = JSON.parse(JSON.stringify(result));
            res.send(result);
        }
    })
}


exports.getPlaylists = function(req, res, next){

    let sql = `select * from playlist where user_id=${req.session.userId}`;
    con.query(sql, (err, result, fields)=>{
        if(err) throw err;
        else{
            result = JSON.parse(JSON.stringify(result));

            // get songs from these playlists
            // let sql2 = `select * song where song_id in (select song_id from playlist_music where playlist_id=${result})`

            // result.push({
            //     songs:
            // })

            res.send(result);
        }
    })
}


exports.getAlbums = function(req, res, next){
    
    let sql = `select album_id, album_name, date_year from album where artist_id=${req.session.userId}`;
    con.query(sql, (err, result, fields)=>{
        if(err) throw err;
        else{
            result = JSON.parse(JSON.stringify(result));
            res.send(result);
        }
    })
}


exports.getPlaylistSongs = function(req, res, next){

    let playlistId = req.params.id;
    let sql = `select * from playlist_music where playlist_id=${playlistId}`;
    con.query(sql, (err, result, fields)=>{
        if(err) throw err;
        else{
            result = JSON.parse(JSON.stringify(result));
            res.send(result);
        }
    })
}


exports.getAlbumSongs = function(req, res, next){

    let albumId = req.params.id;
    let sql = `select * from song where album_id=${albumId} and artist=${req.session.userId}`;
    con.query(sql, (err, result, fields)=>{
        if(err) throw err;
        else{
            result = JSON.parse(JSON.stringify(result));
            res.send(result);
        }
    })
}


exports.uploadPlaylist = function(req, res, next){
    
    let id = req.params.id;
    let newPlaylist=true;
    if(id!=0) newPlaylist=false;



}

exports.uploadAlbum = function(req, res, next){

    


}