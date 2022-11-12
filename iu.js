import React from "react";

import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";

import "./Movies.css";

import * as MoviesApi from "../../utils/MoviesApi";
import { filteredMoviesByDuration, filteredMoviesByKeyWord} from "../../utils/dataFiltering";
import useWindowWidth from "../../utils/useWindowWidth";

import {
  MAX_WIDTH_SCREEN,
  MEDIUM_WIDTH_SCREEN,
  MAX_AMOUNT_CARDS,
  MEDIUM_AMOUNT_CARDS,
  MIN_AMOUNT_CARDS,
  AMOUNT_CARDS_ADD_ON_SCREEN_MAX_WIDTH,
  AMOUNT_CARDS_ADD_ON_SCREEN_MEDIUM_WIDTH,
} from "../../utils/config";

function Movies({ loggedIn, handleAddMovieFavorites, savedMovies, handleDeleteMovieFavorites }) {
  const [movies, setMovies] = React.useState([]);
  const [foundMovies, setFoundMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [limitedMovies, setLimitedMovies] = React.useState([]);
  const [isFoundError, setIsFoundError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFoundActive, setIsFoundActive] = React.useState(false);
  const [isFilterDurationActive, setIsFilterDurationActive] = React.useState(false);
  const windowWidth = useWindowWidth();

  function onSearchMovie(searchText) {
    setIsLoading(true);
    setIsFoundActive(true);
    if (movies.length === 0) {
      MoviesApi.getMovies()
      .then((allMoviesArray) => {
        setMovies(allMoviesArray);
        localStorage.setItem('movies', JSON.stringify(allMoviesArray));
        const filteredAllMoviesArray = filteredMoviesByKeyWord(allMoviesArray, searchText);
        setFoundMovies(filteredAllMoviesArray);
        localStorage.setItem('foundMovies', JSON.stringify(filteredAllMoviesArray));
        setIsFoundActive(false);
      })
      .catch((err) => {
        console.log(err);
        setIsFoundError(true);
      })
      .finally(() => setIsLoading(false));
    } else {
      const filteredFoundMoviesArray = filteredMoviesByKeyWord(movies, searchText);
      setFoundMovies(filteredFoundMoviesArray);
      localStorage.setItem('foundMovies', JSON.stringify(filteredFoundMoviesArray));
      setIsLoading(false);
    }
    localStorage.setItem('searchText', searchText)
    isFilterDurationActive
      ? localStorage.setItem('filterDurationActive', true)
      : localStorage.removeItem('filterDurationActive')
  };

  function handleFilterDuration() {
    isFilterDurationActive
      ? localStorage.removeItem('filterDurationActive')
      : localStorage.setItem('filterDurationActive', true)
      setIsFilterDurationActive((prevState) => !prevState)
  };

  React.useEffect(() => {
    isFilterDurationActive
    ? setFilteredMovies(filteredMoviesByDuration(foundMovies))
    : setFilteredMovies(foundMovies);
  }, [isFilterDurationActive, foundMovies]);

  React.useEffect(() => {
    const allMovies = localStorage.getItem('movies');
    const foundMovies = localStorage.getItem('foundMovies');
    const tumbler = localStorage.getItem('filterDurationActive');

    if (allMovies !== null) {
      setMovies(JSON.parse(allMovies));
    } if (foundMovies !== null) {
      setFoundMovies(JSON.parse(foundMovies));
    } if (tumbler !== null) {
      setIsFilterDurationActive(true);
    }
  }, []);

  React.useEffect(() => {
    let limitedCards;
    if (windowWidth > MAX_WIDTH_SCREEN) {
      limitedCards = MAX_AMOUNT_CARDS
    } else if (windowWidth > MEDIUM_WIDTH_SCREEN) {
      limitedCards = MEDIUM_AMOUNT_CARDS
    } else {
      limitedCards = MIN_AMOUNT_CARDS
    };
    if (filteredMovies.length > limitedCards) {
      setLimitedMovies(filteredMovies.slice(0, limitedCards))
    } else {
      setLimitedMovies(filteredMovies)
    }
  }, [windowWidth, filteredMovies]);

  function handleAddMoviesCard() {
    let connection = windowWidth > MAX_WIDTH_SCREEN
      ? AMOUNT_CARDS_ADD_ON_SCREEN_MAX_WIDTH
      : AMOUNT_CARDS_ADD_ON_SCREEN_MEDIUM_WIDTH;
    setLimitedMovies((previousValue) => {
      return previousValue.concat(filteredMovies.slice(previousValue.length, previousValue.length + connection));
    });
  };

  return (
  <section className="movies">
    <Header loggedIn={loggedIn}/>

    <SearchForm 
      onSearchMovie={onSearchMovie}
      handleFilterDuration={handleFilterDuration}
      tumbler={isFilterDurationActive}
      isLoading={isLoading}
    />

    {isLoading && <Preloader />}

    {isFoundError 
      ? <div className="movies__not-found">
          Во время запроса произошла ошибка. 
          Возможно, проблема с соединением, или сервер недоступен. 
          Подождите немного и попробуйте ещё раз.
        </div>
      : ''}

    {filteredMovies.length === 0 && !isLoading && !isFoundError && isFoundActive
      ? <div className="movies__not-found">
          Ничего не найдено.
        </div>
        : ''}
    
    {filteredMovies.length > 0 && !isLoading && !isFoundError
      && <MoviesCardList
          movies={limitedMovies}
          handleAddMovieFavorites={handleAddMovieFavorites}
          handleDeleteMovieFavorites={handleDeleteMovieFavorites}
          savedMovies={savedMovies}
        />
      }

    {limitedMovies.length < filteredMovies.length
      ? <button
          className="movies__btn-add"
          type="button"
          onClick={handleAddMoviesCard}
        >
          Ещё
        </button>
      : ''}

    <Footer />
  </section>
  )
}

export default Movies;