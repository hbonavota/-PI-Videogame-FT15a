  
import axios from 'axios';
import { GET_VIDEOGAME_DETAIL } from './constants'

export const getDetail = (videogame) => ({
    type: GET_VIDEOGAME_DETAIL,
    payload: videogame
});

export const getGameById = (id) => {
    return (dispatch) => {
        return axios.get(`http://Localhost:3001/videogame/${id}`)
        .then(videogame => {
            if(id.includes("-")){
                let obj = {
                    id: videogame.data.id,
                    name: videogame.data.name,
                    description: videogame.data.description,
                    img: videogame.data.img,
                    released: videogame.data.released,
                    rating: videogame.data.rating,
                    platforms: videogame.data.platforms,
                    genres: videogame.data.genres.map(e=> e.name+ ",")
                }
                return dispatch(getDetail(obj))
            }else{
                dispatch(getDetail(videogame.data))
            }
        })
    }
};