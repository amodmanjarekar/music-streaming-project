
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const isAuthenticate = require('../controllers/authenticate');

router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.post('/register', userController.register);
router.get('/profile', isAuthenticate, userController.getProfile);
router.get('/profile/songs', isAuthenticate, userController.getSongs);

router.get('/profile/playlists', isAuthenticate, userController.getPlaylists);
router.get('/profile/playlists/:id/songs', isAuthenticate, userController.getPlaylistSongs);
router.post('/profile/playlists/:id/upload', isAuthenticate, userController.uploadPlaylist);

router.get('/profile/albums', isAuthenticate, userController.getAlbums);
router.get('/profile/albums/:id/songs', isAuthenticate, userController.getAlbumSongs);
router.post('/profile/albums/upload', isAuthenticate, userController.uploadAlbum);


module.exports=router;