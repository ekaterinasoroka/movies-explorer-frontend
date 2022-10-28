import './MoviesCardList.css';
import React, { useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = ({ cards, moreMovies }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePreloader = () => {
    setIsLoading(true);
  };

  return (
    <section className="movies">
      <div className="movies__container">
        {cards.map((item) => (
          <MoviesCard key={item.id} card={item} />
        ))}
      </div>

      {isLoading ? (
        <Preloader />
      ) : (
        moreMovies && (
          <div className="movies__button-container">
            <button className="movies__button" type="button" onClick={handlePreloader}>Ещё</button>
          </div>
        )
      )}
    </section>
  );
};

export default MoviesCardList;