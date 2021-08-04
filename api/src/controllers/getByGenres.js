const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { Genre} = require('../db.js')
const {API_KEY} = require("../utils/config/index.js") 

function getByGenres(req, res, next){
    //https://api.rawg.io/api/genres?key=5c0e3ef77f9c4ae6be8a2abd71f21285
      const BDgenres = Genre.findAll()
      const genresListApi = axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      Promise.all([BDgenres,genresListApi])
      .then((results) => {
        const [BDgenresResults,genresListApiResults] = results;
        const response = BDgenresResults.concat(genresListApiResults.data.results);
        genresResults =[];
        response.map(items =>{
           return genresResults.push(items.name)
        } )
        
        return Genre.create({
        ...genresResults,
        id: uuidv4()
    })

        res.send(BDgenres);
      })
      .catch((error) => next(error, "este es el error:"))
}

module.exports ={
    getByGenres
}