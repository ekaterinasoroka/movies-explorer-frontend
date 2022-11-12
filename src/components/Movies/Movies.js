import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {


  return (
    <div className="movies">
      <SearchForm 
        handleSearch={props.handleSearch}
        defaultValue={props.defaultSearchValue}
      />
      <MoviesCardList
        cards={props.cards}
        handleButtonMore={props.handleButtonMore}
        isSaveMovie={props.isSaveMovie}
        isOnlySaved={false}
        onMoviesSave={props.onMoviesSave}
        onMoviesDelete={props.onMoviesDelete}
        serverError={props.serverError}
        loading={props.loading}
        isFoundError={props.isFoundError}
        isFoundActive={props.isFoundActive}
      />
    </div>
  );
}

export default Movies;