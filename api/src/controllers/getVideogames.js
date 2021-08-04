const { Videogame} = require('../db.js');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const {API_KEY} = require("../utils/config/index.js") 


function getVideogames(req, res, next) {
    /*
        https://api.rawg.io/api/games?key=5c0e3ef77f9c4ae6be8a2abd71f21285
    GET /videogames:
        Obtener un listado de los videojuegos
        Debe devolver solo los datos necesarios para la ruta principal
    GET /videogames?name="...":
        Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
        Si no existe ningún videojuego mostrar un mensaje adecuado
    */
      let name = req.query.name;
      
      if(name ){
        try {
          let byNameApi = async ()=>{
            try {
              const resApi = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
              return resApi.data
            } catch (error) {
              next(error)
            }
          }

          let byNameBD = async ()=>{
            await Videogame.findAll({
            where:{
              name: name
            }
            })
          };

          if(!byNameApi && !byNameBD) {
            res.status(404).json({error: "the name isn't exists"});
          }
          console.log("hay en BD",byNameBD)
          if(byNameBD.length >= 1){
            console.log("entro en BD",byNameBD)
            const BDandApi = byNameBD.concat(byNameApi)
            return res.json(BDandApi)
          }else{
            console.log("entro API",byNameApi)
            return res.json(byNameApi)
          }

        } catch (error) {
          next(error)
        }


      }

      const BDvideogame = Videogame.findAll()
      const gameListApi = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
      Promise.all([BDvideogame,gameListApi])
      .then((results) => {
        const [BDvideogameResults,gameListApiResults] = results;
        const response = BDvideogameResults.concat(gameListApiResults.data.results);
        res.send(response);
      })
      .catch((error) => next(error, "este es el error:"))
      /*  {
        Videogame.create({
          ...results,
          id: uuidv4()
        })
        res.send(results)
      }) */
}
 
  module.exports = {
    getVideogames
  }