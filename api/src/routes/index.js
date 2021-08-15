const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// mi route busqueda
// mi route de post de videojuegos
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
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
