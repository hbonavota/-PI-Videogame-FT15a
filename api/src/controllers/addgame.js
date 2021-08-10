const { v4: uuidv4 } = require('uuid');
const { Videogame, Genre} = require('../db')
const{getByGenres} = require("./getByGenres")


async function addGame(req, res, next){
    /* POST /videogame:
        Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
        Crea un videojuego en la base de datos 
            id
            Nombre // name 
            Descripción//description
            Fecha de lanzamiento // released 
            Rating rating 
    */ 
    
    //i make destructuring 
    const {name, description,released, rating,img,platforms, genres}= req.body;

    try {
        //it's not possible to save any game with de same name 
        let isrepeat= await Videogame.findOne({ where: { name: name }, include: Genre })
        if(isrepeat) {
            return res.send('Sorry, That Game already exists, try with a diferent name');
        }
        //charging the model genre to 
        await getByGenres();
        
        //create the new videogame to make the association
        const newVideogame = await Videogame.create({
            //use the UUID to establish the diferences entre any videogame from BD and API 
            id: uuidv4(), 
            name,
            description,
            released,
            rating,
            img,
            platforms,
        })
        //get the correct genres that match with ID passed by req.body
        const Genres = await Genre.findAll({
            where:{
            id:parseInt(genres)
            }
        });
        //add the genre in the BD model
        await newVideogame.addGenre(Genres);
        
        //return the complete game  with genre
        let game = await Videogame.findOne({ where: { name: name }, include: [Genre] })
        return res.json(game)

    } catch (error) {
        next(error);
    }
}

module.exports = {
    addGame,
}