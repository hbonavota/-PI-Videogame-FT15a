const axios = require('axios');
const { Genre } = require('../db.js')
const { API_KEY } = require("../utils/config/index.js")

async function getGenres(req, res, next) {
  try {
    let array = []
    // get name and id from all the genres API. 
    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    await genresApi.data.results.map(e => {
      let obj = {
        name: e.name,
        id: e.id
      }
      array.push(obj);
    })
    //get if contains any genre already and concat
    const BDgenres = await Genre.findAll();
    let resconcat = await BDgenres.concat(array);

    //iterate over the result and create in the database
    for (let value of resconcat) {
      await Genre.findOrCreate({
        where: {
          id: value.id,
          name: value.name,
        }
      })
    }

    //make the consult again and response
    let allGenres = await Genre.findAll();
    return res.send(allGenres);

  } catch (error) {
    console.log(error.message)
  }

}

module.exports = {
  getGenres
}