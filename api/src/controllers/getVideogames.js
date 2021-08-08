const { Videogame, Genre} = require('../db')
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const {API_KEY} = require("../utils/config/index.js") 

async function getVideogames(req, res, next) {
          /*
      https://api.rawg.io/api/games?key=5c0e3ef77f9c4ae6be8a2abd71f21285
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
  let name = req.query.name;
  let byNameApi =  async(url)=>{
    let resp = await axios.get(`https://api.rawg.io/api/games?${url}&key=${API_KEY}`)
    return resp.data.results.map(e =>(
          { id: e.id,
            name: e.name,
            description: e.description,
            background_image: e.background_image,
            released: e.released,
            rating: e.rating,
            platforms: e.platforms.map(p => p.platform.name),
            genres: e.genres.map(elem=> elem.name),
          })
    )
  }

  if(name){
      try {
        let byNameBD = await Videogame.findAll({
            where:{
              name: name
            },
            include:{
              model: Genre,
              attributes:["name"]
            }
        })

        /* let byNameApi =  async()=>{
          let resp = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
          return resp.data.results.map(e =>(
                { id: e.id,
                  name: e.name,
                  description: e.description,
                  background_image: e.background_image,
                  released: e.released,
                  rating: e.rating,
                  platforms: e.platforms.map(p => p.platform.name),
                  genres: e.genres.map(elem=> elem.name),
                })
          )
        } */
        Promise.all([byNameBD,byNameApi(`search=${name}`)])
        .then((results) => {
          const [BDres,APIresp] = results;
          const response = BDres.concat(APIresp);
          return res.send(response);
        })
      } catch (error) {
        next(error);
        res.status(404).send("There arent any videogame with that name, please try again")
      }
    }else{
      try {
        const BDgames = await Videogame.findAll({
          include:{
            model: Genre,
            attributes:["name"]
          }
        });
        
        //const gameApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
        //Promise.all([BDgames,gameApi.data.results])
        Promise.all([BDgames,byNameApi(),byNameApi(`&page=2`),byNameApi(`&page=3`),byNameApi(`&page=4`),byNameApi(`&page=5`)])
        .then((results) => {
          const [BDarray,api1,api2,api3,api4,api5] = results;
          const response = BDarray.concat(api1,api2,api3,api4,api5);
          console.log(response.length)
          res.send(response);
        })
      } catch (error) {
        next(error);
        res.status(404).send("There arent any videogame with that name, please try again");
      }

    }

}
 
module.exports = {
  getVideogames
}