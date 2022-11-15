import React from 'react';
import { Route, Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import NavFilms from '../NavFilms/NavFilms';
import './Header.css';
import OverlayMobile from '../OverlayMobile/OverlayMobile';

function Header(props) {
  const endpoints = [
    "/",
    "/profile",
    "/movies",
    "/saved-movies",
  ]

  return (
    <Route exact path={endpoints}>
      <header className="header">
        <div className="header__container">
          <Link to='/'><img className="header__logo" src={logo} alt="Логотип" /></Link>
          <NavFilms loggedIn={props.loggedIn}/>
          <Navigation loggedIn={props.loggedIn} />
          <OverlayMobile loggedIn={props.loggedIn}/>
        </div>
      </header>
    </Route>
  );
}

export default Header;