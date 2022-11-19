
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


exports.createPlaylist = function(req, res, next){
    
    let playlist_id = req.body.playlist_id;                        // id>0, use existing playlist   also uses existing songs
    let song_id = req.body.song_id;
    let playlist_name = req.body.playlist_name;
    let user_id = req.session.userId;

    if(playlist_id==0){            // new playlist

        let sql = `insert into playlist(pl_name, user_id) values (${playlist_name}, ${user_id})`;
        con.query(sql, (err, result, f)=>{
            if(err) throw err;
            else{
                // insert song into playlist_music
                result = JSON.parse(JSON.stringify(result));
                playlist_id = result.insertId;

                let sql = `insert into playlist_music(playlist_id, song_id) values (${playlist_id}, ${song_id})`;
                con.query(sql, (err, result, f)=>{
                    if(err) throw err;
                    else{
                        res.end();
                    }
                })
            }
        })
    }
    else{
        let sql = `insert into playlist_music(playlist_id, song_id) values (${playlist_id}, ${song_id})`;
        con.query(sql, (err, result, f)=>{
            if(err) throw err;
            else{
                res.end();
            }
        })
    }

    
    


}

exports.createAlbum = function(req, res, next){

    // everytime new album will be created      // only new songs will be added

    let new_album = req.body.album;              // album name
    let song_title = req.body.song_title ;       // song name 
    
    let files = req.files;
    let user_id = req.session.userId;
    
    console.log("total uploads count: ", files.length);

    // first save the album
    let new_album_id;
    let sql = `insert into album(artist_id, album_name, date_year) values (${user_id}, ${new_album}, NOW())`;
    con.query(sql, (err, result, f)=>{
        if(err) throw err;
        else{
            result = JSON.parse(JSON.stringify(result));
            console.log(result);
            new_album_id = result.insertId;

            console.log("new album id: ", new_album_id);

            // save the music in db
            for(var i=0; i<files.length; i++){
                let sql = `insert into song(title, artist, album_id, link) values (${song_title}, ${user_id}, ${new_album_id}, '${files[i].filename}')`;          // path is fixed for each song
                con.query(sql, (err, result, f)=>{
                    if(err) throw err;
                    else{
                        result = JSON.parse(JSON.stringify(result));
                        console.log(result);
                    }
                })
            }

            res.end();
        }
    })


}
// C:\Users\SHRI\Desktop\dbmsProject\musico\music-streaming-project\musico-server\public\uploads      // songs path