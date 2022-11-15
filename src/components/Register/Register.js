import React from 'react';
import '../Form/Form.css';

import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import useFormWithValidation from '../../hook/useFormWithValidation';

function Register({onRegister, errorMessage}) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation({});

  const submitForm = (e) => {
    e.preventDefault();
    onRegister(values.name, values.email, values.password);
    resetForm();
  };

  return (
  <section className="form">
  <div className="form__container">
    <Link to="/" className="form__link">
      <img className="form__logo" src={logo} alt="Логотип"></img>
    </Link>
    <h2 className="form__title">Добро пожаловать!</h2>
    <form className="form__inputs" onSubmit={submitForm} noValidate>
      <div className="form__items">
      <label className="form__subtitle">
          <p className="form__subtitle-text">Имя</p>
          <input 
            type="text" 
            className="form__input" 
            name="name"
            onChange={handleChange}
            value={values.name || ''}
            required 
            minLength={2}
            maxLength={30}
          />
          <p className={`form__error ${errors.name ? 'form__error-display' : ''}`}>{errors.name}</p>
        </label>
        <label className="form__subtitle">
          <p className="form__subtitle-text">E-mail</p>
          <input 
            type="email" 
            className="form__input" 
            name="email"
            onChange={handleChange}
            value={values.email || ''}
            required   
          />
          <p className={`form__error ${errors.email ? 'form__error-display' : ''}`}>{errors.email}</p>
        </label>
        <label className="form__subtitle">
          <p className="form__subtitle-text">Пароль</p>
          <input 
            type="password" 
            className={`form__input ${errors.password ? 'form__input_color-error' : ''}`}
            required 
            name="password"
            onChange={handleChange}
            value={values.password || ''}
            minLength={6}
            maxLength={24}
            />
          <p className={`form__error ${errors.password ? 'form__error-display' : ''}`}>{errors.password}</p>
        </label>
      </div>
      <span className="form__error_server form__error_server-display">{errorMessage}</span>
      <button 
        type="submit" 
        className={`form__button ${isValid ? "" : "form__button_disabled"}`}
        disabled={!isValid ? true : ''}
      >
          Зарегистрироваться
        </button>
    </form>
    <p className="form__text">
      Уже зарегистрированы?
      <Link to="/signup" className="form__link">Войти</Link>
    </p>
  </div>
</section>
);
}

export default Register;
