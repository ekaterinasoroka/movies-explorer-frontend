import './SearchForm.css';

import { useEffect, useState } from 'react';

function SearchForm(props) {
  const [tumbler, setTumbler] = useState(false);
  const [movie, setMovie] = useState('');

  useEffect(() => {
    setMovie(props.defaultValue);
    setTumbler(JSON.parse(localStorage.getItem('shortFilms')) || false);
  }, [props.defaultValue])

  function handleChangeMovie(event) {
    setMovie(event.target.value);
  }

  function handleChangeTumbler(event) {
    const shortFilms = event.target.checked;
    setTumbler(shortFilms);
    props.handleSearch(movie, shortFilms);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.handleSearch(movie, tumbler);
  }

  return (
    <section className="search">
      <form className="search-form" onSubmit={handleSubmit} noValidate>
        <label className="search-form__search">
          <input 
            className="search-form__input" 
            type="text" 
            placeholder="Фильм"
            value={movie}
            onChange={handleChangeMovie} 
            required
            />
          <button 
            className="search-form__button"
            type="submit"
            onClick={handleSubmit}
          >
          </button>
        </label>
        <div className="search-form__checkbox">
        <label className="search-form__check">
          <input
            type="checkbox"
             checked={tumbler}
             onChange={handleChangeTumbler}
          >
          </input>
          <span className="search-form-switch"></span>
          <p className="search-form__checkbox-name">Короткометражки</p>
        </label>
        </div>
      </form>
    </section>

  );
}

export default SearchForm;
