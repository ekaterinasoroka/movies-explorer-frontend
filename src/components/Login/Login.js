import Form from '../Form/Form';

function Login() {
  return (
    <Form title="Рады видеть!" button="Войти" question="Ещё не зарегистрированы?" link="Регистрация" path="/signup">
      <div className="form__subtitle">
        <p className="form__subtitle-text">E-mail</p>
        <input type="email" className="form__input" defaultValue="pochta@yandex.ru" required />
      </div>

      <div className="form__subtitle">
        <p className="form__subtitle-text">Пароль</p>
        <input type="password" className="form__input form__input_color-error" required />
      </div>
    </Form>
  );
}

export default Login;