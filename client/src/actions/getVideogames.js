import axios from 'axios';
import { GET_VIDEOGAMES } from './constants'

export const getAllGames = () => {
    return async function(dispatch){
        try {
            let json = await axios.get('http://localhost:3001/videogames');
            return dispatch({
                type: GET_VIDEOGAMES,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};