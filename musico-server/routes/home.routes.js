
const express= require('express');
const router = express.Router();

const homeController = require('../controllers/home');

router.get('/', homeController.home);
router.get('/search', homeController.search);
router.get('/discover/album', homeController.getAlbum);
router.get('/discover/playlist', homeController.getPlaylist);
router.get('/discover/artist', homeController.getArtist);




module.exports = router;