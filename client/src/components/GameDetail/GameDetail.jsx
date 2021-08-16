import { useEffect, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getGameById } from '../../actions/getDetail';
import style from '../GameDetail/GameDetail.module.css'

export default function GameDetail() {
    const dispatch = useDispatch()
    const stateD = useSelector(state => state.detail)
    const { id } = useParams()
    useEffect(() => {
        dispatch(getGameById(id))
    }, [id, dispatch]);
    return (
        <div>
            {
                stateD && Object.keys(stateD).length > 0 ?
                    <div className={style.allDiv}>
                        <div>
                            <h1 className={style.title}>Videogame: {stateD.name}</h1>
                            <img className={style.img} src={stateD.img} alt="Not found" />
                            <h6 className={style.des}>{ /* stateD.description.includes("<")? stateD.description.replace(/<[^>]+>/g,'') : stateD.description */
                              stateD.description.replace(/<[^>]+>/g, '')  }</h6>
                            <div className={style.cp}>
                                <h4 className={style.text}>
                                    <span className={style.tt}>◽ Rating:  </span>{stateD.rating}
                                    <span className={style.tt}>◽ Platforms:</span>{stateD.platforms}
                                </h4>
                                <h4 className={style.text}>
                                    <span className={style.tt}>◽ Genres:</span>{stateD.genres}
                                    <span className={style.tt}>◽ Released Date:  </span>{stateD.releaseDate}
                                </h4>
                            </div>
                        </div>
                        <Link to="/Home">
                            <button className={style.btn}>
                                back home
                            </button>
                        </Link>
                    </div>
                    :
                    <div className={style.loading}></div>
            }
        </div>
    )
}