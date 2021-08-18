import React from 'react';
import style from './Paginado.module.css'

export default function Paginado({gamesPerPage,stateV,paginado}){
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(stateV/gamesPerPage) ; i++) {
        pageNumbers.push(i)
    }
    return(
        <nav>
            <ul className={style.pagination}>
                {
                    pageNumbers?.map(number=>(
                            <a key = {number} onClick={() => paginado(number)}>{number}</a>
                    ))
                }
            </ul>
        </nav>
    )
}