import Form from '../Form/Form';

function Register() {
  return (
    <Form title="Добро пожаловать!" button="Зарегистрироваться" question="Уже зарегистрированы?" link="Войти" path="/signin">
      <div className="form__subtitle">
        <p className="form__subtitle-text">Имя</p>
        <input type="text" className="form__input" defaultValue="Екатерина" required />
        <p className="form__error">Что-то пошло не так...</p>
      </div>

      <div className="form__subtitle">
        <p className="form__subtitle-text">E-mail</p>
        <input type="email" className="form__input" defaultValue="pochta@yandex.ru" required />
        <p className="form__error">Что-то пошло не так...</p>
      </div>

      <div className="form__subtitle">
        <p className="form__subtitle-text">Пароль</p>
        <input type="password" className="form__input form__input_color-error" defaultValue="•••••••••••" required />
        <p className="form__error form__error-display">Что-то пошло не так...</p>
      </div>
    </Form>
  );
}

export default Register;
