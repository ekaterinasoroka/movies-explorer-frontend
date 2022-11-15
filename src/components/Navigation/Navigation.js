import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';
import accountIcon from '../../images/account_icon.svg'

function Navigation(props) {

  return (
    <>
      {!props.loggedIn &&
        <div className="navigation">
          <NavLink to="/signup" className="navigation__button navigation__button_reg">Регистрация</NavLink>
          <NavLink to="/signin" className="navigation__button navigation__button_log">Войти</NavLink>
        </div>}
      {props.loggedIn &&            
        <div className="navigation">
          <NavLink to="/profile" className="navigation__button navigation__button-profile">
            <p className="navigation__button-profile_text">Аккаунт</p>
            <img className="navigation__button-profile_icon" src={accountIcon} alt="иконка"></img>
          </NavLink>
        </div>
        }
    </>
  );
}

export default Navigation;