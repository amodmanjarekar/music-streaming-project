
const { response } = require('express');
const { MongoErrorLabel } = require('mongodb');
const con = require('./dbConnection');

exports.home = function(req, res, next){

    let songs=[];
    let albums=[];
    let playlists=[];

    let sqlSongs = `select name,title,duration,album_name,date_year,link from users natural join song natural join album limit 8`;
    con.query(sqlSongs, (err, result, fields)=>{
        if(err) throw err;
        else{
            result=JSON.parse(JSON.stringify(result));
            songs = result;
        }
    })

    let sqlPlaylists= 'select * from playlist where public=1 limit 5';
    con.query(sqlPlaylists, (err, result, fields)=>{
        if(err) throw err;
        else{
            result = JSON.parse(JSON.stringify(result));
            playlists=result;
        }
    })

    let sqlAlbums = 'select * from album limit 5';
    con.query(sqlAlbums, (err, result, fields)=>{
        if(err) throw err;
        else{
            result = JSON.parse(JSON.stringify(result));
            albums =result;

            res.send({
                songs: songs,
                playlists: playlists,
                albums: albums
            })
        }
    })
}


exports.search = function(req, res, next){

    let search_query= req.query.search_query;

    let tosend = {
        songs: new Object,
        albums: new Object,
        artists: new Object
    }

    let sql = `select name,title,duration,album_name,date_year,link from users natural join song natural join album where title like '%${search_query}%'`;
    con.query(sql, (err, result, f)=>{
        if(err) throw err;
        else{
            result= JSON.parse(JSON.stringify(result));
            tosend.songs = result;
        }
    })

    sql = `select album_id, album_name from album where album_name like '%${search_query}%'`;
    con.query(sql, (err, result, f)=>{
        if(err) throw err;
        else{
            result = JSON.parse(JSON.stringify(result));
            tosend.albums=result;      
        }
    })

    sql = `select artist_id, name from users where name like '%${search_query}%'`;
    con.query(sql, (err, result, f)=>{
        if(err) throw err;
        else{
            result = JSON.parse(JSON.stringify(result));
            tosend.artists = result;

            res.send(tosend);
        }
    })
}


exports.getAlbum = function(req, res, next){
    
    let album_id = req.query.album_id;

    if(!album_id) res.send({});
    else{
        let sql = `select album_id,album_name,title,link,name from song natural join users natural join album where album_id = ${album_id}`;
        con.query(sql, (err, result, f)=>{
            if(err) throw err;
            else{
                result = JSON.parse(JSON.stringify(result));
                res.send(result);
            }
        })
    }
}


exports.getPlaylist = function(req, res, next){
    
    let playlist_id = req.query.playlist_id;

    res.send();
}

exports.getArtist = function(req, res, next){

    let artistId = req.query.artist_id;
    let tosend={
        artist: new Object,
        albums: new Object,
        playlists: new Object
    };

    //album list and playlists for a artist

    let sql = `select name, username from users where artist_id = ${artistId}`;
    con.query(sql, (err, result, f)=>{
        if(err) throw err;
        else{
            result = JSON.parse(JSON.stringify(result));
            tosend.artist=result;
        }
    })

    sql = `select album_id,album_name,date_year from album where artist_id = ${artistId}`;
    con.query(sql, (err, result, f)=>{
        if(err) throw err;
        else{
            result = JSON.parse(JSON.stringify(result));
            tosend.albums=result;
        }
    })

    sql=`select playlist_id, pl_name from playlist where artist_id=${artistId}`;
    con.query(sql, (err, result, f)=>{
        if(err) throw err;
        else{
            result=JSON.parse(JSON.stringify(result));
            tosend.playlists=result;

            res.send(tosend);
        }
    })
}