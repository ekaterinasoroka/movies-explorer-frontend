class MoviesApi {
  constructor(url) {
    this._url = url;
    this._headers = {
      'Content-Type': 'application/json',
    }
  }

  _checkingTheResponse(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`'Ошибка': ${res.status}`);
  }

  getMovies() {
    return fetch(`${this._url}/beatfilm-movies`, {
      headers: this._headers
    })
      .then(this._checkingTheResponse);

  }
}

const moviesApi = new MoviesApi('https://api.nomoreparties.co'); 

export default moviesApi;
