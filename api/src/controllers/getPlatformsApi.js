const axios = require('axios');
const { API_KEY } = require("../utils/config/index.js")

async function getPlatformsApi(req, res, next) {
    try {
        let getApi = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
        let results= getApi.data.results.map(e =>(
                  { id: e.id,
                    name: e.name,
                    img: e.image_background,
                  }
        ))
        res.send(results)
      } catch (error) {
        next(error);
        /* res.status(500).send("sorry, Api is not working"); */
      }
    }


module.exports = {
getPlatformsApi
}