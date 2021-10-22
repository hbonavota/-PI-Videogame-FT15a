import React from 'react';
import { Link } from 'react-router-dom';
import style from './Landing.module.css'

export default function LandingPage() {
    return (
        <div className={style.content} >
            <div className={style.conTitle}>
                <h1 className={style.title}> ENTER TO GAMEZONE</h1>
                <Link to='/Home'><button className={style.bt}>PRESS START</button></Link>
            </div>
        </div>
    )
}