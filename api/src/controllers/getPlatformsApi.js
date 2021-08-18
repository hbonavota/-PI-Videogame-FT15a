const axios = require('axios');
const { API_KEY } = require("../utils/config/index.js")

async function getPlatformsApi(req, res, next) {
  try {
    //get at the enpoint that contains all platforms
    let getApi = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
    let results = getApi.data.results.map(
    // return only id, name and image
      e => (
        {
          id: e.id,
          name: e.name,
          img: e.image_background,
        }))
    //response the array with all platforms
    res.send(results)
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPlatformsApi
}