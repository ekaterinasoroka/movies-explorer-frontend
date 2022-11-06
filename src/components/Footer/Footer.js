import './Footer.css';

function Footer(props) {

  return (
    props.loggedIn &&
    <footer className="footer">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__container">
        <p className="footer__copyright">&copy;2022</p>

        <nav className="footer__nav">
          <ul className="footer__lists">
            <li className="footer__list">
              <a className="footer__link" href="https://practicum.yandex.ru/web/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li className="footer__list">
              <a className="footer__link" href="https://github.com/ekaterinasoroka/" target="_blank" rel="noreferrer">Github</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
