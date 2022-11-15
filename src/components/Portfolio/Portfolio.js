import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h4 className="portfolio__header">Портфолио</h4>

      <ul className="portfolio__lists">
        <li className="portfolio__list">
          <a className="portfolio__link" href="https://github.com/ekaterinasoroka/how-to-learn" target="_blank" rel="noreferrer">
            Статичный сайт
          </a>
          <p className="portfolio__link-arrow">↗</p>
        </li>
        <li className="portfolio__list">
          <a className="portfolio__link" href="https://github.com/ekaterinasoroka/russian-travel" target="_blank" rel="noreferrer">
            Адаптивный сайт
          </a>
          <p className="portfolio__link-arrow">↗</p>
        </li>
        <li className="portfolio__list">
          <a className="portfolio__link" href="https://github.com/ekaterinasoroka/react-mesto-api-full" target="_blank" rel="noreferrer">
            Одностраничное приложение
          </a>
          <p className="portfolio__link-arrow">↗</p>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;