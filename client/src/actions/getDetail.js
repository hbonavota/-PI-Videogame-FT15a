  
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
            let api= videogame.data;
            if(id.includes("-")){
                let obj = {
                    id: api.id,
                    name: api.name,
                    description: api.description,
                    img: api.img,
                    released: api.released,
                    rating: api.rating,
                    platforms: api.platforms,
                    genres: api.genres.map(e=> e.name+ " ,")
                }
                return dispatch(getDetail(obj))
            }else{
                dispatch(getDetail(videogame.data))
            }
        })
    }
};