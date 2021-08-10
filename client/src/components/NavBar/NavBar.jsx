import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByName, loading } from '../../actions/getByName'
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css'
import logo from './pic.png';

export default function NavBar() {
  const [name, setName] = useState('')
  const dispatch = useDispatch()

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getByName(name));
    dispatch(loading(true));
    setName('')
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
      <img src={logo} alt="logo" width="64px" height="60px" />
      </div>
      <nav>
        <Link to="/Home"><span>Home</span></Link>
        <form /* className={styles.searchBar} */>
          <input
            className={styles.inputSearch}
            type="text"
            id="title"
            placeholder='Search a videogame...'
            autoComplete="off"
            value={name}
            onChange={(e) => handleChange(e)}  >
          </input>
          <button onClick={(e) => handleSubmit(e)} >🔍️</button>
        </form>
        <Link to="/create"><span>Create Game</span></Link>
      </nav>
    </div>
  )
}