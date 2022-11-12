export const url = 'http://localhost:4000';
// export const url = 'https://api.evsoroka.nomoredomains.icu';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (name, email, password) => {
  return fetch(`${url}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  })
    .then(res => checkResponse(res))
};


export const authorize = (email, password) => {
  return fetch(`${url}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  })
    .then(response => checkResponse(response))
}

export const logout = () => {
  return fetch(`${url}/signout`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })
    .then(response => checkResponse(response))
}