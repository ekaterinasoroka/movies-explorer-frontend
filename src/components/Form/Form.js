import './Form.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Form(props) {
    return (
    <section className="form">
      <div className="form__container">
        <Link to="/"><img className="form__logo" src={logo} alt="логотип"></img></Link>
        <h3 className="form__title">{props.title}</h3>
        <form className="form__inputs">
          <div className="form__items">{props.children}</div>
          <button type="submit" className="form__button" disabled>{props.button}</button>
        </form>
        <p className="form__text">{props.question}
          <Link to={props.path} className="form__link">{props.link}</Link>
        </p>
      </div>
    </section>
  );
}

export default Form;