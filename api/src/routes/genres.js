const { Router } = require('express');
const { getGenres } = require('../controllers/getGenres.js')
const router = Router();

router.get('/', getGenres)

module.exports = router;
