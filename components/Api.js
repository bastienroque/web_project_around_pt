export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers || {};
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return res.text().then(text => {
      console.error('API response error', res.status, text);
      const message = text ? `${res.status} - ${text}` : `${res.status}`;
      return Promise.reject(new Error(`API error: ${message}`));
    });
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getCards() {
    return this.getInitialCards();
  }

  updateUser(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: Object.assign({}, this._headers, { 'Content-Type': 'application/json' }),
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: Object.assign({}, this._headers, { 'Content-Type': 'application/json' }),
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: Object.assign({}, this._headers, { 'Content-Type': 'application/json' }),
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getAppInfo() {
    return Promise.all([this.getUser(), this.getInitialCards()]);
  }
}

export const api = new Api({
  baseUrl: 'https://around-api.pt-br.tripleten-services.com/v1',
  headers: {
    authorization: '1da0d044-34aa-4152-ac1c-b80b56571712',
    'Content-Type': 'application/json',
  },
});