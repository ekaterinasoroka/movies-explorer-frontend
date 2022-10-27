import React from 'react';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import NavFilms from '../NavFilms/NavFilms';
import './Header.css';
import OverlayMobile from '../OverlayMobile/OverlayMobile';

function Header(props) {

  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Логотип" />
        <NavFilms loggedIn={props.loggedIn}/>
        <Navigation loggedIn={props.loggedIn} />
        <OverlayMobile loggedIn={props.loggedIn}/>
      </div>
    </header>
  );
}

export default Header;