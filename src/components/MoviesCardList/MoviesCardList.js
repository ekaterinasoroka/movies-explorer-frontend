import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader'
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  if (props.loading) return <Preloader />
  if (props.cards.length === 0 && !props.loading && !props.isFoundError && props.isFoundActive) return <span className="movies__error">Ничего не найдено</span>
  if (props.serverError) return <span className="movies__error">Во время запроса произошла ошибка.
    Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</span>

  const foundMovies = JSON.parse(localStorage.getItem('foundMovies'))
  return (
    <section className="movies">
      <div className="movies__container">
      {
          props.cards.map(card => {
            return (
              <MoviesCard
                card={card}
                key={props.isOnlySaved ? card.movieId : card.id}
                isSaveMovie={props.isSaveMovie}
                isOnlySaved={props.isOnlySaved}
                onMoviesSave={props.onMoviesSave}
                onMoviesDelete={props.onMoviesDelete}
              />
            )
          })
        }
      </div>
      
          <div className="movies__button-container">
            {props.isOnlySaved ? '' :
              (props.cards.length < foundMovies.length ?
            <button className="movies__button" onClick={props.handleButtonMore} type="button">Ещё</button> 
            : '')}
          </div>
       
    </section>
  );
};

export default MoviesCardList;