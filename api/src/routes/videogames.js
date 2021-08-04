const { Router } = require('express');
const {getVideogames,getById} = require('../controllers/getVideogames.js')
const router = Router();

router.get('/', getVideogames);

/* router.get('/:name', getByName)  */


module.exports = router;
