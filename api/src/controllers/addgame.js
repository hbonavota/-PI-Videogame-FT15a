const { v4: uuidv4 } = require('uuid');
const { Videogame, Genre} = require('../db')
const{getByGenres} = require("./getByGenres")
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

    try {

        let isrepeat= await Videogame.findOne({ where: { name: name }, include: Genre })
        if(isrepeat) {
            return res.send('Sorry, That Game already exists, try with a diferent name');
        }
        await getByGenres()
        const newVideogame = await Videogame.create({
        id: uuidv4(),
        name,
        description,
        released,
        rating,
        parent_plaforms,
        })

        const Genres = await Genre.findAll({
            where:{
                id:parseInt(genres)
            }
            /*where: {
                id:{
                    [Op.in]: genres
                }
            } 
            */
        });

        await newVideogame.addGenre(Genres);

        let game = await Videogame.findOne({ where: { name: name }, include: [Genre] })

        return res.json(game)

    } catch (error) {
        next(error);
    }
    
/*     return Videogame.create({
        id: uuidv4(),
        name,
        description,
        released,
        rating,
        parent_plaforms,
        genres
        
    })
    .then((newVideogame) => res.send(newVideogame))
    .catch((error) => next(error, "este es el error:")) */
}

module.exports = {
    addGame,
}