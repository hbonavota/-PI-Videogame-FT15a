import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getAllGames } from '../../actions/getVideogames';
import addGame from '../../actions/addGame'
import getGenres from '../../actions/getGenres'
import getPlatforms from '../../actions/getPlatforms'
import style from './CreateGame.module.css'
import logo from '../NavBar/pic.png'

export default function CreateGame() {
    const stateP = useSelector(state => state.platforms)
    const stateG = useSelector(state => state.genres)
    const dispatch = useDispatch()
    const { push } = useHistory()
    const urlRegEXP = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!]))?/;
    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, [dispatch]);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('');
    const [rating, setRating] = useState(0);
    const [released, setreleased] = useState('');
    const [platforms, setPlatforms] = useState("");
    const [genres, setGenres] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        if (name === '') return alert('Name is required');
        if (description === '') return alert('Description is required');
        if (img === '') return alert('Url image is required');
        if (!urlRegEXP.test(img)) return alert('Image it most be an URL');
        if (released === '') return alert('Release date is required');
        if (platforms.length === 0) return alert('You most select at least one platform');
        if (genres.length === 0) { return alert('You most select at least one genre'); }
        else {
            let body = { name, description, img, released, rating, platforms, genres }
            dispatch(addGame(body))
            alert('Your videogame was created!')
            dispatch(getAllGames())
            push("/home")
        }
    }

    function handleChange(e) {
        switch (e.target.name) {
            case 'name': setName(e.target.value); break;
            case 'description': setDescription(e.target.value); break;
            case 'img': setImg(e.target.value); break;
            case 'rating': setRating(e.target.value); break;
            case 'released': setreleased(e.target.value); break;
            case 'platforms':
                let validPlat = document.getElementsByName("platforms");
                let pos = " ";

                for (let i = 0; i < validPlat.length; i++) {
                    if (validPlat[i].checked) {
                        pos += validPlat[i].value + ", ";
                    }

                }
                setPlatforms(pos); break;
            case 'genres':
                let validcheckbox = document.getElementsByName("genres");
                let res = [];

                for (let i = 0; i < validcheckbox.length; i++) {
                    if (validcheckbox[i].checked) {
                        res.push(validcheckbox[i].value);
                    }

                }
                setGenres([...res]); break;
            default: break
        }
    }

    return (
        <div className={style.bigDiv}>
            <div className={style.searchBar}>
                <Link to="/"><span>
                    <img src={logo} alt="logo" width="64px" height="60px" />
                </span></Link>
            </div>
            <div className={style.global}>
                <div className={`${style.container} ${style.center}`}>
                    <form onSubmit={(e) => handleSubmit(e)} className={style.form} autoComplete="off">
                        <div className={style.subtitle}>¡Let's create your videogame!</div>
                        <div className={`${style.input_container} ${style.ic1}`}>
                            <input className={style.input} type="text" name="name" value={name} required onChange={handleChange} placeholder="Write a name" />
                        </div>
                        <div className={`${style.input_container} ${style.ic2}`} >
                            <input className={style.input} type="text" name="description" value={description} required onChange={handleChange} placeholder="Short description" />
                        </div>
                        <div className={`${style.input_container} ${style.ic2}`}>
                            <input className={style.input} type="url" pattern="https?://.+" name="img" value={img} required onChange={handleChange} placeholder="Image url..." />
                        </div>
                        <div className={`${style.input_container} ${style.ic2}`}>
                            <input className={style.input} type="date" name="released" value={released} required onChange={handleChange} placeholder="Release Date" />
                        </div>
                        <div className={`${style.input_container} ${style.ic2}`}>
                            <input className={style.input} type="number" name="rating" value={rating} max="5" min="1" required onChange={handleChange} placeholder="Rating from 1 to 5" />
                        </div>
                    </form>
                </div >
                <div className={`${style.inputCheck} ${style.al} ${style.left}`}>
                    <form>
                        <h4 className={style.subtitlePlat}> Select Platforms</h4>
                        {stateP.map((elem) => {
                            return (
                                <div key={elem.id} className={style.subtitlePlat}>
                                    <input
                                        type='checkbox'
                                        name='platforms'
                                        value={elem}
                                        onChange={(e) => { handleChange(e) }}
                                    />
                                    <label name={elem}>{elem}</label>
                                </div>
                            )
                        })}
                    </form>
                </div>
                <div className={`${style.inputCheck} ${style.al} ${style.right}`}>
                    <form>
                        <h4 className={style.subtitleGenre}>Select Genres</h4>
                        {stateG.map((el) => {
                            return (
                                <div className={style.subtitlePlat} key={el.id}>
                                    <input
                                        type='checkbox'
                                        name='genres'
                                        value={el.id}
                                        onChange={(ele) => { handleChange(ele) }}
                                    />
                                    <label name={el}>{el.name}</label>
                                </div>
                            )
                        })}
                    </form>
                </div>
                <input className={style.submit} onClick={handleSubmit} type="submit" value="Create game" />
            </div>
            <Link to="/Home">
                <button className={style.back}>
                    Back Home
                </button>
            </Link>
        </div >
    );
}