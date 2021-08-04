const { Router } = require('express');
const {getByGenres} = require('../controllers/getByGenres.js')
const router = Router();

router.get('/', getByGenres)

module.exports = router;
