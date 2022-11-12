/* eslint-disable react-hooks/exhaustive-deps */
import './SavedMovies.css';
import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {
  const [filteredMovies, setFilteredMovies] = useState([])

  function handleSearch(movieName, isShortFilms) {
    const filteredMovies = props.cards.filter((item) => item.nameRU.toLowerCase().includes(movieName.toLowerCase()))
    if (isShortFilms) {
      setFilteredMovies(filteredMovies.filter((item) => item.duration <= 40))
    }
    else {
      setFilteredMovies(filteredMovies)
    }
  }

  function initFilteredMovies() {
    setFilteredMovies(props.cards)
  }

  useEffect(() => {
    setFilteredMovies(
      filteredMovies.filter(movie => props.cards.some(card => movie.movieId === card.movieId))
    )
  }, [filteredMovies, props.cards])

  useEffect(() => {
    initFilteredMovies()
  }, [initFilteredMovies])

  return (
    <div className="saved-movies">
      <SearchForm 
        handleSearch={handleSearch}
        defaultValue=""
      />
      <MoviesCardList
        cards={filteredMovies}
        isSaveMovie={props.isSaveMovie}
        isOnlySaved={true}
        onMoviesDelete={props.onMoviesDelete}
        serverError={props.serverError}
        loading={props.loading}
      />
    </div>
  );
};

export default SavedMovies;
