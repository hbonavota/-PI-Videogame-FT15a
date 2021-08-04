const { Router } = require('express');
const {getById} = require('../controllers/getById.js')
const router = Router();


router.get('/:id', getById)


module.exports = router;
