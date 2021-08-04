const { Videogame} = require('../db.js');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const {API_KEY} = require("../utils/config/index.js") 


function getById (req, res, next) {
    /* GET /videogame/{idVideogame}:
        Obtener el detalle de un videojuego en particular
        Debe traer solo los datos pedidos en la ruta de detalle de videojuego
        Incluir los géneros asociados 
    */
          const id = req.params.id
          return Videogame.findByPk(id)
          .then((Videogame) => res.send(Videogame))
          .catch((error) => next(error))
        }

  /* function getByName ('/:name', (req, res, next){
      const name= req.params.name
      const { count, rows } = Videogame.findAndCountAll({
          where: {
            name: {
              [type]: name
            }
          },
          offset: 10,
          limit: 15
        });
        console.log(count);
        console.log("aca hago el map",rows);
  
  }  */

  module.exports = {
    getById

  }