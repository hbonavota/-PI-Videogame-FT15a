  
import axios from 'axios';
import { GET_PLATFORMS } from './constants'

export default function getPlatforms() {
    return (dispatch) => {

        return axios.get('http://localhost:3001/videogames')
            .then(videogame => {
                let array = videogame.data.map(e=> e.platforms)
                console.log(array);

                let result = array.filter((item,index)=>{
                    return array.indexOf(item) === index;
                })
/*                 let arrayfilt= array.map(e=>{
                    return e;
                }) */
                dispatch({ type: GET_PLATFORMS, payload: result})
            })
    }
}