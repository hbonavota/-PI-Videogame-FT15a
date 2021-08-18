const { Router } = require('express');
const router = Router();

const getByIdRoute = require('./getById');
const gamesRoute = require('./videogames');
const addgamesRoute = require('./addgame');
const genres = require('./genres');
const getAllPlatforms = require('./getAllPlatforms');

router.use("/videogame", getByIdRoute);
router.use("/videogames", gamesRoute);
router.use("/addgame", addgamesRoute);
router.use("/genres", genres);
router.use("/platforms", getAllPlatforms);

module.exports = router;
