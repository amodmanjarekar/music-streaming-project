
const con = require('./dbConnection');
const session = require('express-session');
const cookieParser = require('cookie-parser');


exports.login = function(req, res, next){
    // username password
    let username = req.body.username;
    let password = req.body.password;

    let sql =`select artist_id, name, email, username from users where username="${username}" and hash_password="${password}"`;
    con.query(sql, async (err, result, fields)=>{
        if(err) throw err;
        else{
            if(result.length!=0){
                result=JSON.parse(JSON.stringify(result));
                req.session.auth=true;
                req.session.userId = result[0].artist_id;
            
                res.send({
                    status:"success",
                    artist_id: result[0].artist_id
                })
            }
            else{
                //res.sendStatus(401);
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

    console.log("registration for ", username, password, name, email);
    
    let sql = `insert into users(name, email, username, hash_password) values ("${name}", "${email}", "${username}", "${password}")`;

    con.query(sql, async (err, result, fields)=>{
        if(err) throw err;
        else{
            result = JSON.parse(JSON.stringify(result));
            
            console.log(result);
            
            req.session.auth=true;
            req.session.userId = result.insertId;            // saving session;
            res.send({
                status: "success",                       // successful registration
                user_id: insertId                 // user_id
            })
        }
    })


}


exports.getProfile = function(req, res, next){

        if(req.session.userId===undefined || req.session.userId===null){
            res.send(false);
        }
        else{
            const user_id = req.body.userId;
            console.log("from getProfile -> user_id:", user_id);
            
            let sql = `select * from users where artist_id = ${user_id}`;
            con.query(sql, (err, result, fields)=>{
                if(err) throw err;
                else{
                    result = JSON.parse(JSON.stringify(result));
                    res.send(result);
                }
            })
        }
}


exports.getSongs = function(req, res, next){

    let sql = `select * from song where artist_id=${req.body.userId}`;
    con.query(sql, (err, result, fields)=>{
        if(err) throw err;
        else{
            result = JSON.parse(JSON.stringify(result));
            res.send(result);
        }
    })
}


exports.deleteSong = function(req, res, next){
    
    let id = req.params.id;
    let sql = `delete from song where song_id=${id}`;
    con.query(sql, (err, result, f)=>{
        if(err) throw err;
        else{
            res.send({
                message: "success"
            })
        }
    })
}


exports.getPlaylists = function(req, res, next){

    let sql = `select * from playlist where artist_id=${req.body.userId}`;
    con.query(sql, (err, result, fields)=>{
        if(err) throw err;
        else{
            result = JSON.parse(JSON.stringify(result));
            res.send(result);
        }
    })
}


exports.getAlbums = function(req, res, next){
    
    let sql = `select album_id, album_name, date_year from album where artist_id=${req.body.userId}`;
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
    
    let playlist_id = req.body.playlist_id;                        // id>0, use existing playlist   also uses existing songs      // id =0 , create new playlist
    let song_id = req.body.song_id;
    let playlist_name = req.body.playlist_name;
    let user_id = req.session.userId;

    if(playlist_id==0){            // new playlist

        let sql = `insert into playlist(pl_name, artist_id) values (${playlist_name}, ${user_id})`;
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


exports.deletePlaylist = function(req, res, next){
    
    let id = req.params.id;
    let sql = `delete from playlist where playlist_id=${id}`;
    con.query(sql, (err, result, f)=>{
        if(err) throw err;
        else{
            res.send({
                message: "success"
            })
        }
    })
}

exports.createAlbum = function(req, res, next){

    // everytime new album will be created      // only new songs will be added

    let new_album = req.body.albumName;              // album name
    let titles = req.body.song_titles ;       // songs title
    
    let files = req.files;
    let user_id = req.body.userId;


    console.log(new_album, song_title, user_id);


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
                var song_title = titles[i]
                let sql = `insert into song(title, artist_id, album_id, link) values (${song_title}, ${user_id}, ${new_album_id}, '${files[i].filename}')`;          // path is fixed for each song
                con.query(sql, (err, result, f)=>{
                    if(err) throw err;
                    else{
                        result = JSON.parse(JSON.stringify(result));
                        console.log(result);
                    }
                })
            }
            
            console.log("total uploads count: ", files.length);
            res.send({
                status: "success"
            })
        }
    })

}


exports.deleteAlbum = function(req, res, next){

    let id = req.params.id;
    let sql = `delete from album where album_id=${id}`;
    con.query(sql, (err, result, f)=>{
        if(err) throw err;
        else{
            res.send({
                message: "success"
            })
        }
    })
}
// C:\Users\SHRI\Desktop\dbmsProject\musico\music-streaming-project\musico-server\public\uploads      // songs path