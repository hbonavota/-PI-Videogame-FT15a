const { Videogame} = require('../db.js');
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
  if(name){

    try {
      let byNameBD = await Videogame.findAll({
        where:{
          name: name
        }
      })
      /* 
      let byNameApi = ()=>{
        let resApi= await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
      
        resApi.data.results.map(e =>{
        let nuevoOBJ= {
          name: e.name,
          background_image: e.background_image,
          genres: e.genres[] 
        }
      })
      }
      
      */
      let byNameApi = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
       console.log("byNameApi",byNameApi)

       
      Promise.all([byNameBD,byNameApi.data.results])
      .then((results) => {
        const [byNameBDResults,byNameApiResults] = results;
        const response = byNameBDResults.concat(byNameApiResults);
        return res.send(response);
        //console.log("response es ;",response);
        return response;
      })
      .then((algo) =>console.log("algo es ;",algo) )

/*       let mapres= response.map(obj=>{
        let objnuevo= {
          name: obj.name,
          genres: obj.genres,
          background_image: obj.background_image,
        }
        console.log(mapres)
        return objnuevo;
      })
      res.send(objnuevo) */
/*       .then((resu) => resu.map(obj =>{
        let objnuevo= {
          name: obj.name,
          genres: obj.genres,
          background_image: obj.background_image,
        }
        return objnuevo;
      }
        )) */

    } catch (error) {
      next(error);
    }
  }else{
    const BDvideogame = await Videogame.findAll();
    const gameListApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    Promise.all([BDvideogame,gameListApi.data.results])
    .then((results) => {
      const [BDvideogameResults,gameListApiResults] = results;
  
      //console.log("gameListApiResults: ",gameListApiResults)
      const response = BDvideogameResults.concat(gameListApiResults);
      
      res.send(response);
    })
    .catch((error) => next(error, "este es el error:"))

  }

}
 
module.exports = {
  getVideogames
}