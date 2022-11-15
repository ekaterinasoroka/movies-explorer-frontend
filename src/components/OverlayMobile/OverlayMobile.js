import React from 'react';
import { NavLink } from 'react-router-dom';

import './OverlayMobile.css';
import accountIcon from '../../images/account_icon.svg'

function OverlayMobile(props) {
  const [isOpenPopup, setIsOpenPopup] = React.useState(false);

  function openPopup() {
    setIsOpenPopup(true);
  }

  function closePopup() {
    setIsOpenPopup(false);
  }

  return (
    <>
      {props.loggedIn &&
        <button className="overlay__icon" type="button" onClick={openPopup}></button>}
      {isOpenPopup &&
        <div className="overlay__popup-overlay">
          <div className="overlay__popup">
            <button className="overlay__close-icon" type="button" onClick={closePopup}></button>
            <div className="overlay__popup-container">
              <NavLink exact to="/" className="overlay__button_popup" activeClassName="overlay__button-popup_active">Главная</NavLink>
              <NavLink to="/movies" className="overlay__button_popup" activeClassName="overlay__button-popup_active">Фильмы</NavLink>
              <NavLink to="/saved-movies" className="overlay__button_popup" activeClassName="overlay__button-popup_active">Сохранённые фильмы</NavLink>
            </div>
            <NavLink to="/profile" className="overlay__button-profile_popup">
              <p className="overlay__profile_text">Аккаунт</p>
              <img className="overlay__profile_icon" src={accountIcon} alt="иконка"></img>
            </NavLink>
          </div>
        </div>
      }
    </>
  );
}

export default OverlayMobile;