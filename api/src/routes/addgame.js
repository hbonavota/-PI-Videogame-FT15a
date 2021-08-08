const { Router } = require('express');
const {addGame} = require('../controllers/addgame.js')
const router = Router();

router.post('/', addGame)

module.exports = router;
