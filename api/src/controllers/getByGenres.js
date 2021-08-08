const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { Genre} = require('../db.js')
const {API_KEY} = require("../utils/config/index.js") 

async function getByGenres(req, res, next){
  try {
    let array= []
    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    await genresApi.data.results.map(e=>{
      let obj = {
        name: e.name,
        id: e.id
      }
      array.push(obj);
    })

    const BDgenres = await Genre.findAll();
    let resconcat = await BDgenres.concat(array);

  
    /* for (let i = 0; i < response.length; i++) {
      await Genre.findOrCreate({
        where: {name:response[i]}
      })    
    }
     */
    for (let value of resconcat) {
      await Genre.findOrCreate({
        where: {
          id: value.id,
          name:value.name, 
        }
      })
    }
    let allGenres = await Genre.findAll();
    return res.send(allGenres);

  } catch (e) {
    console.log(e.message)
  }

/*       Promise.all([BDgenres,genresApi])
      .then((results) => {
        const [BDgenresResults,genresApiResults] = results;
        const response = BDgenresResults.concat(genresApiResults.data.results);
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
      .catch((error) => next(error, "este es el error:")) */
}

module.exports ={
    getByGenres
}