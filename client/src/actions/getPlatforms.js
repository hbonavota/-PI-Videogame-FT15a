  
import axios from 'axios';
import { GET_PLATFORMS } from './constants'
 
export default function getPlatforms() {
/* Use de endpoing plataforms from API in backend, is better because there are all plataforms */
       return (dispatch) => {
        return axios.get('http://localhost:3001/platforms')
            .then(results => {
                let res= []
                results.data.forEach((item)=> res.push(item.name))
                dispatch({ type: GET_PLATFORMS, payload: res.sort()})
            })
    }


}