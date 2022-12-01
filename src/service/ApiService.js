import config from '../config';
import JwtService from './JwtService';

const ApiService = {
  getProducts(query) {
    return fetch(`${config.API_ENDPOINT}/search?q=${query}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : res.json()
      )
  },

  postSummary(query) {
    return fetch(`${config.API_ENDPOINT}/summary?q=${query}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : res.json()
      )
  },

  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/user`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  postLogin({ username, password }) {
    return fetch(`${config.API_ENDPOINT}/auth`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : res.json()
      )
  },

  refreshToken() {
    return fetch(`${config.API_ENDPOINT}/auth`, {
      method: 'PUT',
      headers: {
        'authorization': `Bearer ${JwtService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  createForum(title, content){
    return fetch(`${config.API_ENDPOINT}/forum`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${JwtService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({title, content} ),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  postComment(content, forum_id){
    return fetch(`${config.API_ENDPOINT}/forum/${forum_id}/comment`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${JwtService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({content} ),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
}

export default ApiService;
