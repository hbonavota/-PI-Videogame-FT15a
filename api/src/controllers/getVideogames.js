const { Videogame, Genre } = require('../db')
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const { API_KEY } = require("../utils/config/index.js")


async function getVideogames(req, res, next) {
  /*
      https://api.rawg.io/api/games?
    GET /videogames:
        Obtener un listado de los videojuegos
        Debe devolver solo los datos necesarios para la ruta principal
         Input de búsqueda para encontrar videojuegos por nombre
        Área donde se verá el listado de videojuegos. Deberá mostrar su:
        Imagen
        Nombre
        Géneros
    GET /videogames?name="...":
        Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
        Si no existe ningún videojuego mostrar un mensaje adecuado
  */
  let name = req.query.name; //I keep the name

  //function to serialize information from API
  let fromApi = async (url) => {
    let resp = await axios.get(`https://api.rawg.io/api/games?${url}&key=${API_KEY}`)
    return resp.data.results.map(e => (
      {
        id: e.id,
        name: e.name,
        description: e.description,
        img: e.background_image,
        released: e.released,
        rating: e.rating,
        platforms: e.platforms ? e.platforms.map(p => p.platform.name) : null,
        genres: e.genres,
      }
    ))
  }
  // if have any name from query. Enter in the if
  if (name) {
    try {
      //consult to bring me the game that matches with the "name". I bring the model "genre".
      let byNameBD = await Videogame.findAll({
        where: {
          name: name
        },
        include: {
          model: Genre,
          attributes: ["name"]
        }
      })
      //resolve two consults with "promise all", BD and API and concat, after i make the response
      Promise.all([byNameBD, fromApi(`&search=${name}`)])
        .then((results) => {
          const [BDres, APIresp] = results;
          const response = BDres.concat(APIresp);
          if (response.length > 1) {
            return res.send(response);
          } else {
            res.status(404).send("There arent any videogame with that name, please try again");
          }
        })

    } catch (error) {
      next(error);
    }
    // if not have any name from query. Enter in the else and the response is all games... include BD and API.
  } else {
    try {
      //consult to bring me all the game in the BD. I bring the model "genre".
      const BDgames = await Videogame.findAll({
        include: {
          model: Genre,
          attributes: ["name"]
        }
      });
      ////resolve the consults from API. needs one hundred games

      await Promise.all([BDgames, fromApi(), fromApi(`&page=2`), fromApi(`&page=3`), fromApi(`&page=4`), fromApi(`&page=5`)])
        .then((results) => {
          const [BDarray, api1, api2, api3, api4, api5] = results;
          const response = BDarray.concat(api1, api2, api3, api4, api5);
          res.send(response);
        })
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  getVideogames
}