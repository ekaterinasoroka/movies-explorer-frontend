import { useState, useEffect } from 'react';

import './App.css';
import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFoundError from '../NotFoundError/NotFoundError';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/Auth';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [savedFilms, setSavedFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [moreMovies, setMoreMovies] = useState(0);

  useEffect(() => {
    mainApi.getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
        setLoggedIn(true);
        getSavedMovies();
        history.push('/movies');
      })
      .catch((err) => console.log(err));

  }, [history])

  function onRegister(name, email, password) {
    return auth.register(name, email, password)
      .then(() => {
        onLogin(
          email,
          password,
        )
          history.push('/movies');
      })
      .catch((err) => {
        setErrorMessage(err);
        console.log(err);
      });
    };

    function onLogin(email, password) {
      return auth.authorize(email, password)
        .then((res) => {
            setLoggedIn(true);
            setCurrentUser(res);
            getUserInfo();
            history.push('/movies');
        })
        .catch((err) => {
          setErrorMessage(err);
          console.log(err);
        });
    };

    function getUserInfo() {
      mainApi.getUserInfo()
        .then((userData) => {
          setLoggedIn(true);
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err.message);
        })
    }

    function handleEditProfile(name, email) {
      mainApi.updateUserInfo({ name, email })
        .then(() => {
          setCurrentUser({ name, email });
        })
        .catch((err) => {
          setErrorMessage('Что-то пошло не так...');
          console.log(err.message)
        })
    }

    function onLogout() {
      return auth.logout()
      .then(() => {
        setLoggedIn(false);
        history.push('/signin');
      })
      .catch((err) => console.log(err));
    };
  
  
    function searchMovie(movieName, shortFilms) {
      setLoading(true)
      moviesApi.getMovies()
        .then((movies) => {
          const searchedMovies = movies.filter((item) => item.nameRU.toLowerCase().includes(movieName.toLowerCase()));
          const foundMovies = shortFilms ? searchedMovies.filter((item) => item.duration <= 40) : searchedMovies;
          localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
          localStorage.setItem('searchMovieName', movieName);
          localStorage.setItem('shortFilms', shortFilms);
          setLoading(false);
          handleResize();
        })
        .catch((err) => {
          console.log(err.message);
          setLoading(false);
          setServerError(true);
        })
    }
  
    function checkWindowWidth() {
      setWindowWidth(window.innerWidth);
    }

    function handleResize() {
      const foundMovies = JSON.parse(localStorage.getItem('foundMovies'));
      if (foundMovies === null) {
        return;
      }
      if (windowWidth >= 1280) {
        setMovies(foundMovies.slice(0, 12));
        setMoreMovies(3);
      } else if (windowWidth > 480 && windowWidth < 1280) {
        setMovies(foundMovies.slice(0, 8));
        setMoreMovies(2);
      } else if (windowWidth <= 480) {
        setMovies(foundMovies.slice(0, 5));
        setMoreMovies(2);
      }
    }
  
    useEffect(() => {
      window.addEventListener('resize', checkWindowWidth);
      handleResize();
    }, [windowWidth])
  
    function handleButtonMore() {
      const foundMovies = JSON.parse(localStorage.getItem('foundMovies'));
      setMovies(foundMovies.slice(0, movies.length + moreMovies));
    }
  
    function handleSearch(movieName, isShortFilms) {
      searchMovie(movieName, isShortFilms);
    }
  
  
    function getSavedMovies() {
      mainApi.getSavedMovies()
        .then((savedMovies) => {
          setSavedFilms(savedMovies);
        })
        .catch((err) => {
          console.log(err.message);
        })
    }
   
    function handleMoviesSave(movie) {
      mainApi.likeAndAddMovie(movie)
        .then((movieData) => {
          setSavedFilms([...savedFilms, movieData]);
        })
        .catch((err) => {
          console.log(err.message);
        })
    }
  
    function handleMoviesDelete(card) {
      const deleteCard = savedFilms.find(c => c.movieId === (card.id || card.movieId) && c.owner === currentUser._id);
      if (!deleteCard) 
      return
      mainApi.deleteSavedMovie(deleteCard._id)
        .then(() => {
          setSavedFilms(savedFilms.filter(c => c._id !== deleteCard._id));
        })
        .catch((err) => {
          console.log(err.message);
        })
    }
  
    function isSaveMovie(card) {
      return savedFilms.some(item => item.movieId === card.id && item.owner === currentUser._id)
    }

  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header loggedIn={loggedIn}/>
        <Switch>
          <Route exact path='/'>
            <Main />
            <Footer loggedIn={loggedIn}/>
          </Route>
          <ProtectedRoute
            path='/movies'
            component={Movies}
            loggedIn={loggedIn}
            handleSearch={handleSearch}
            defaultSearchValue={localStorage.getItem('searchMovieName') || ""}
            cards={movies}
            handleButtonMore={handleButtonMore}
            isSaveMovie={isSaveMovie}
            onMoviesSave={handleMoviesSave}
            onMoviesDelete={handleMoviesDelete}
            serverError={serverError}
            loading={loading}
          />
          <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            loggedIn={loggedIn}
            loading={loading}
            cards={savedFilms}
            isSaveMovie={isSaveMovie}
            onMoviesDelete={handleMoviesDelete}
            serverError={serverError}
          />
          <ProtectedRoute
            path='/profile'
            component={Profile}
            loggedIn={loggedIn}
            onSubmit={handleEditProfile}
            onLogout={onLogout}
          />
          <Route path="/signup">
            <Register onRegister={onRegister} errorMessage={errorMessage}/>
          </Route>
          <Route path="/signin">
            <Login onLogin={onLogin} errorMessage={errorMessage}/>
          </Route>
          <Route path="*">
            <NotFoundError />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
          </Route>
        </Switch>     
      </div> 
    </CurrentUserContext.Provider>   
  );
}

export default App;
