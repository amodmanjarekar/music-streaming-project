
const con = require('./dbConnection');

exports.home = function(req, res, next){

    let songs=[];
    let albums=[];
    let playlists=[];

    let sqlSongs = `select * from song limit 10`;
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