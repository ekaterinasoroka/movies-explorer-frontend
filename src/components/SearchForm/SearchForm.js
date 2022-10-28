import React from 'react';
import './SearchForm.css';

function SearchForm() {

  return (
    <section className="search">
      <div className="search-form">
        <form className="search-form__search">
          <input className="search-form__input" type="search" placeholder="Фильм" required></input>
          <button className="search-form__button" type="submit"></button>
        </form>
        <div className="search-form__checkbox">
        <label className="search-form__check">
          <input type="checkbox"></input>
          <span className="search-form-switch"></span>
          <p className="search-form__checkbox-name">Короткометражки</p>
        </label>
        </div>
      </div>
    </section>

  );
}

export default SearchForm;