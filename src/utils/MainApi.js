class MainApi {
  constructor(url) {
    this._url = url;
    this._headers = {
      'Content-type': 'application/JSON',
    };
  }
  _checkingTheResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkingTheResponse);
  }

  likeAndAddMovie(data) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        country: data.country || 'Нет данных',
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: (`https://api.nomoreparties.co/${data.image.url}`),
        trailerLink: data.trailerLink || 'https://www.youtube.com',
        nameRU: data.nameRU || 'Нет данных',
        nameEN: data.nameEN || 'Нет данных',
        thumbnail: (`https://api.nomoreparties.co/${data.image.formats.thumbnail.url}`),
        movieId: data.id,
      }),
    }).then(this._checkingTheResponse);
  }

  deleteSavedMovie(data) {
    return fetch(`${this._url}/movies/${data}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkingTheResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkingTheResponse);
  }

  updateUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._checkingTheResponse);
  }

  logout() {
    return fetch(`${this._url}/logout`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkingTheResponse);
  }
}

const mainApi = new MainApi('https://api.evsoroka.nomoredomains.icu');

export default mainApi;