import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavFilms.css';

function NavFilms(props) {

  return (
    <>
      {props.loggedIn &&
        <div className="navifilms">
          <NavLink to="/movies" className="navifilms__button" activeClassName="navifilms__button_active">Фильмы</NavLink>
          <NavLink to="/saved-movies" className="navifilms__button" activeClassName="navifilms__button_active">Сохранённые фильмы</NavLink>
        </div>
      }
    </>
  );
}

export default NavFilms;