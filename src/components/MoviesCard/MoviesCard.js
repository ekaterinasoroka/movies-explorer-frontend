import './MoviesCard.css';
import React from 'react';
import { useLocation } from 'react-router-dom';

const MoviesCard = ({ card }) => {
  const [like, setLike] = React.useState(false);

  function handleLikeToogle() {
    setLike(!like);
  }

  const { pathname } = useLocation();

  return (
    <section className="card">

      <div className="card__element">
        <p className="card__title">{card.title}</p>
        <div className="card__buttons">
          {pathname === '/saved-movies' ? (
            <button type="button" className="card__button card__button_delete" />
          ) : (
            <button
              type="button"
              className={`card__button card__button${like ? '_on' : '_off'}`}
              onClick={handleLikeToogle}
            />
          )}
        </div>
      </div>
      <p className="card__duration">{card.duration}</p>
      <img src={card.image} alt={card.title} className="card__img"></img>
    </section>
  );
};

export default MoviesCard;