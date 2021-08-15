  
import axios from 'axios';
import { GET_PLATFORMS } from './constants'
 
export default function getPlatforms() {
/* get platforms from the onehundred  videogames
     return (dispatch) => {

        return axios.get('http://localhost:3001/videogames')
            .then(videogame => {
                let array = videogame.data
                let res= []
                for (let value of array) {
                    res =res.concat(value.platforms);
                  }
                let result = res.filter((item,index)=>{
                    return res.indexOf(item) === index;
                })
                dispatch({ type: GET_PLATFORMS, payload: result.sort()})
            })
    } */

/* Use de endpoing plataforms from API in backend, is better because there are all plataforms */
       return (dispatch) => {

        return axios.get('http://localhost:3001/platforms')
            .then(results => {
                let res= []
/*                 let obj = results.data; */
                results.data.map(e=>{
                return res.push(e.name)
                })
/*                 for (let value of array) {
                    res =res.concat(value.platforms);
                  } */
/*                 let result = array.filter((item,index)=>{
                    return res.indexOf(item) === index;
                }) */

                dispatch({ type: GET_PLATFORMS, payload: res.sort()})
            })
    }


}