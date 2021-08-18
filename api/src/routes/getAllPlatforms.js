const { Router } = require('express');
const { getPlatformsApi } = require('../controllers/getPlatformsApi.js')
const router = Router();

router.get('/', getPlatformsApi)

module.exports = router;
