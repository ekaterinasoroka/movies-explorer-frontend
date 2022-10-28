import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className="aboutproject" id="about-project">
      <h2 className="aboutproject__header">О проекте</h2>

      <div className="aboutproject__container">
        <div className="aboutproject__info">
          <h3 className="aboutproject__info_title">Дипломный проект включал 5 этапов</h3>
          <p className="aboutproject__info_subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>

        <div className="aboutproject__info">
          <h3 className="aboutproject__info_title">На выполнение диплома ушло 5 недель</h3>
          <p className="aboutproject__info_subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>

      <div className="aboutproject__container">
        <div className="aboutproject__week">
          <h4 className="aboutproject__week_title">1 неделя</h4>
          <p className="aboutproject__week_subtitle">Back-end</p>
        </div>

        <div className="aboutproject__week">
          <h4 className="aboutproject__week_title aboutproject__week_title-last">4 недели</h4>
          <p className="aboutproject__week_subtitle">Front-end</p>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;