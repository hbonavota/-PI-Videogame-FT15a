const { Videogame,Genre} = require('../db.js');
const axios = require('axios');
const {API_KEY} = require("../utils/config/index.js") 

async function getById (req, res, next) {
    /* GET /videogame/{idVideogame}:
        Obtener el detalle de un videojuego en particular
        Debe traer solo los datos pedidos en la ruta de detalle de videojuego
        Ruta de detalle de videojuego: debe contener
        *imagen, 
        *nombre  
        géneros
        *Descripción
        *Fecha de lanzamiento
        *Rating
        *Plataformas
        *Incluir los géneros asociados
    */
  try {
    //keep the id
    const id = req.params.id;
    //if the id conteins "-". it's a UUID and then search in the BD 
    if(id.includes("-")){
      await Videogame.findAll({
        where:{
          id:id
        },
        include:{
          model: Genre,
          attributes:["name"]
        }
        })
      .then(response=> res.json(response))
      .catch(err =>next(err))
    }else{
      //else search in API
        let resp = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        let obj = {
          id: resp.data.id,
          name: resp.data.name,
          description: resp.data.description,
          background_image: resp.data.background_image,
          released: resp.data.released,
          rating: resp.data.rating,
          platforms: resp.data.platforms.map(p => p.platform.name),
          genres: resp.data.genres.map(e=> e.name),
        }
        return res.json(obj)
    }
  
  } catch (error) {
    next(error);
    return res.json("Please enter any valid ID")
  }
}

module.exports = {
  getById
}