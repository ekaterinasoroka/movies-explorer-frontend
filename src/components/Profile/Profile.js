import './Profile.css';
import { useContext, useEffect, useState } from 'react';
import useFormWithValidation from '../../hook/useFormWithValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const { values, setValues, handleChange, errors, isValid, resetForm } =
  useFormWithValidation({});


  useEffect(() => {
    if (
      values.name === currentUser.name ||
      values.email === currentUser.email ||
      !isValid
    ) {
      setIsInputDisabled(true);
    } else {
      setIsInputDisabled(false);
    }
  }, [currentUser, values, isValid]);

  useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email });
  }, [setValues, currentUser]);

  

  const updateProfile = (e) => {
    e.preventDefault();
    props.onSubmit(values.name, values.email);
    resetForm();
  };

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__form" onSubmit={updateProfile} noValidate>
        <div className="profile__field">
          <label className="profile__label">Имя</label>
          <input 
            className="profile__input" 
            type="text" 
            name="name" 
            required
            minLength={2}
            maxLength={30}
            onChange={handleChange}
            value={values.name || ''}
  
          />
        </div>
        {errors?.name && <span className="profile__input-error">{errors.name}</span>}
        <div className="profile__field">
          <label className="profile__label">E-mail</label>
          <input 
            className="profile__input" 
            type="email" 
            name="email" 
            required 
            onChange={handleChange}
            value={values.email || ''}
          />
        </div>
        {errors?.email && <span className="profile__input-error">{errors.email}</span>}

        {props.isUserUpdateSuccess ? (
            <span className="profile__edit-status_ok">Данные успешно изменены</span>
          ) : (
            ''
          )}
          {props.isUserUpdateFailed ? (
            <span className="profile__edit-status_error">
              Произошла ошибка, попробуйте снова
            </span>
          ) : (
            ''
          )}
        <button 
          className={`profile__button ${isInputDisabled ? "profile__button_disabled" : 
            "profile__button"}`} 
          type="submit"
          disabled={isInputDisabled}
          >
            Редактировать
        </button>
        <button 
          className="profile__button profile__button_logout" 
          type="button"
          onClick={props.onLogout}
          >
            Выйти из аккаунта
        </button>

      </form>
    </section>
  )
}

export default Profile;

