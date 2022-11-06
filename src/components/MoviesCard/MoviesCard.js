import './MoviesCard.css';
import React from 'react';

import './MoviesCard.css';

function MoviesCard(props) {
  const image = props.isOnlySaved ? props.card.image : `https://api.nomoreparties.co/${props.card.image.url}`

  const duration = () => {
    if (props.card.duration > 60) {
      return (props.card.duration / 60 | 0) + "ч " + props.card.duration % 60 + "м"
    }
    if (props.card.duration === 60) {
      return (props.card.duration / 60) + "ч"
    } else {
      return props.card.duration + "м"
    }
  }

  function handleMoviesSave() {
    props.onMoviesSave(props.card)
  }

  function handleMoviesDelete() {
    props.onMoviesDelete(props.card)
  }

  return (
    <section className="card">

      <div className="card__element">
        <p className="card__title">{props.card.nameRU}</p>
        <div className="card__buttons">
          {props.isOnlySaved ? 
            <button 
              type="button" 
              className="card__button card__button_delete"
              onClick={handleMoviesDelete}
            /> :
            (props.isSaveMovie(props.card) ?
            <button
              type="button"
              className='card__button card__button_on'
              onClick={handleMoviesDelete}
            /> :
            <button
              type="button"
              className='card__button card__button_off'
              onClick={handleMoviesSave}
            />
          )}
        </div>
      </div>
      <p className="card__duration">{duration()}</p>
      <a className="card__image-content" href={props.card.trailerLink}
        target="_blank" rel="noreferrer">
      <img className="card__img" src={image} alt='Постер'></img>
      </a>
    </section>
  );
};

export default MoviesCard;