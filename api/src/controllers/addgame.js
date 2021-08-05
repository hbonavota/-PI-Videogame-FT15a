const { v4: uuidv4 } = require('uuid');
const { Videogame} = require('../db.js')
const Sequelize = require('sequelize');
const Op = Sequelize.Op; 
async function addGame(req, res, next){
    /* POST /videogame:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
Crea un videojuego en la base de datos 
Nombre // name ok
Descripción//description
Fecha de lanzamiento // released ok
Rating rating ok*/ 
    const {name, description,released, rating,parent_plaforms, genres}= req.body;
    //const videogame= req.body;
  /*   try {
        let isrepeat= await Videogame.findOne({ where: { name: name }, include: Genre })
        if(isrepeat) {
            return res.send('Sorry, That Game already exists, try with a diferent name');
        }
        const newVideogame = await Videogame.create({
        id: uuidv4(),
        name,
        description,
        released,
        rating,
        parent_plaforms,
        genres,
    })
    const Genres = await Genre.findAll({
        where: {
            id:{
                [op.in]: genres
            }
        }
    });
    await newVideogame.setGenres(Genres);
    let game = await Videogame.findOne({ where: { name: name }, include: [Platform, Genre] })
        return res.json(game)

    } catch (error) {
        next(error);
    } */
    
    return Videogame.create({
        id: uuidv4(),
        name,
        description,
        released,
        rating,
        parent_plaforms,
        genres
        
    })
    .then((newVideogame) => res.send(newVideogame))
    .catch((error) => next(error, "este es el error:"))
}

module.exports = {
    addGame,
}