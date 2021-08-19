
import axios from 'axios';
import { GET_GENRES } from './constants'

export default function getGenres() {
    return (dispatch) => {
        return axios.get(`http://Localhost:3001/genres`)
            .then(videogame => {
                dispatch({ type: GET_GENRES, payload: videogame.data.sort((a, b) => { return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1 }) })
            })
    }
}