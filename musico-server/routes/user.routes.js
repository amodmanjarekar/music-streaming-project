
const express = require('express');
const router = express.Router();
const upload = require('../models/multerModel');

const userController = require('../controllers/userController');
// const isAuthenticate = require('../controllers/authenticate');



function isAuthenticate(req, res, next){
    console.log("from isAuthenticate ", req.session);
    if(req.session && (req.session.userId!=undefined || req.session.userId!=null)) next();
    else res.send(false);
}

router.get('/auth', isAuthenticate, (req, res)=>{
    res.send(true);
});


router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.post('/register', userController.register);
router.get('/profile', userController.getProfile);
router.get('/profile/songs', isAuthenticate, userController.getSongs);
router.post('/profile/song/:id/delete', isAuthenticate, userController.deleteSong);

router.get('/profile/playlists', isAuthenticate, userController.getPlaylists);
router.get('/profile/playlists/:id/songs', isAuthenticate, userController.getPlaylistSongs);
router.post('/profile/playlists/add', isAuthenticate, userController.createPlaylist);
router.post('/profile/playlists/:id/delete', isAuthenticate, userController.deletePlaylist);

router.get('/profile/albums', isAuthenticate, userController.getAlbums);
router.get('/profile/albums/:id/songs', isAuthenticate, userController.getAlbumSongs);
router.post('/profile/albums/upload', isAuthenticate, upload.array("music_files", 8), userController.createAlbum);
router.post('/profile/albums/:id/delete', isAuthenticate, userController.deleteAlbum);





module.exports=router;