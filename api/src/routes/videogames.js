const { Router } = require('express');
const { getVideogames } = require('../controllers/getVideogames.js')
const router = Router();

router.get('/', getVideogames);

module.exports = router;
