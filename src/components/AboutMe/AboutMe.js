import './AboutMe.css';
import avatar from '../../images/avatar.jpg';

const AboutMe = () => {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__header">Студент</h2>

      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__name">Екатерина</h3>
          <p className="about-me__profession">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__description">
            Живу в Воронеже, родом из Воронежской области, закончила ВГАСУ по специальности "Информационные системы". 
          </p>

          <div className="about-me__links">
            <a className="about-me__link" href="https://github.com/ekaterinasoroka" rel="noreferrer" target="_blank">Github</a>
          </div>
        </div>

        <img src={avatar} alt="фотокарточка" className="about-me__img" />
      </div>
    </section>
  );
};

export default AboutMe;