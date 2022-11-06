import './Profile.css';
import { useContext, useEffect, useState } from 'react';
import useFormWithValidation from '../../hook/useFormWithValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {
  const [isInputDisabled, setIsInputDisabled] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const currentUser = useContext(CurrentUserContext);
  const { values, setValues, handleChange, errors, isValid, resetForm } =
  useFormWithValidation({});

  useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email });
  }, [setValues, currentUser]);

  const updateProfile = (e) => {
    e.preventDefault();
    props.onSubmit(values.name, values.email);
    resetForm();
  };

  function handleEditProfile() {
    setIsInputDisabled(false)
  }

  function handleSave() {
    setIsSuccess(true)
  }

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__form" onSubmit={updateProfile}>
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
            value={values.name}
            disabled={isInputDisabled}
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
            value={values.email}
            disabled={isInputDisabled}
          />
        </div>
        {errors?.email && <span className="profile__input-error">{errors.email}</span>}

        {isSuccess ? <p className="profile__edit-status_ok">Изменения сохранены</p> :
          <span className="profile__edit-status_error">{errors?.email}</span>}

        {isInputDisabled ? (
          <>
        <button 
          className="profile__button profile__button_submit" 
          type="submit"
          onClick={handleEditProfile}
          >
            Редактировать
        </button>
        <button 
          className="profile__button profile__button_logout" 
          type="submit"
          onClick={props.onLogout}
          >
            Выйти из аккаунта
        </button>
        </>
        ) : (
          <button className={isValid ? "profile__save-button hover-button" :
            "profile__save-button profile__save-button_disabled"} 
            onClick={handleSave} 
            type="submit" 
          >
            Сохранить
          </button>
        )}
      </form>
    </section>
  )
}

export default Profile;

