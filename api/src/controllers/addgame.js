const { v4: uuidv4 } = require('uuid');
const { Videogame} = require('../db.js')

function addGame(req, res, next){
    /* POST /videogame:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
Crea un videojuego en la base de datos 
Nombre // name ok
Descripción//description
Fecha de lanzamiento // released ok
Rating rating ok*/ 
    const {name, description,released, rating,parent_plaforms}= req.body;
    //const videogame= req.body;
    return Videogame.create({
        id: uuidv4(),
        name,
        description,
        released,
        rating,
        parent_plaforms
        
    })
    .then((newVideogame) => res.send(newVideogame))
    .catch((error) => next(error, "este es el error:"))
}

module.exports = {
    addGame,
}