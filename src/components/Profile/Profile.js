import './Profile.css'

function Profile() {
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Екатерина!</h2>
      <form className="profile__form">
        <div className="profile__field">
          <label className="profile__label">Имя</label>
          <input className="profile__input" type="text" name="name" defaultValue="Екатерина" required />
        </div>
        <div className="profile__field">
          <label className="profile__label">E-mail</label>
          <input className="profile__input" type="email" name="email" defaultValue="pochta@yandex.ru" required />
        </div>
        <button className="profile__button profile__button_submit" type="submit">Редактировать</button>
        <button className="profile__button profile__button_logout" type="submit">Выйти из аккаунта</button>
      </form>
    </section>
  )
}

export default Profile;

