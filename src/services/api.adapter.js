/* eslint-disable */
import axios from 'axios';
import { baseUrlDev, baseUrlProd } from './constants';

export class ApiAdapter {
  constructor() {
    const env = process.env.REACT_APP_ENV;
    this._url = env === 'development' ? baseUrlDev : baseUrlProd;

    // alternative to approach above
    // this._url = location.origin.includes('localhost') ? baseUrlDev : baseUrlProd;
  }

  composeUrl = path => `${this._url}${path}`;

  get = (path, params = {}) => {
    const endpoint = this.composeUrl(path);

    const request = axios.get(endpoint, { params })
      .then(response => response)
      .catch(error => Promise.reject({ error }));

    return request;
  };

  post = (path, body = {}) => {
    const endpoint = this.composeUrl(path);
    
    const request = axios.post(endpoint, body)
      .then(response => {
        return response;
      })
      .catch(error => Promise.reject({ error }));

    return request;
  };

  put = (path, body = {}) => {
    const endpoint = this.composeUrl(path);

    const request = axios.put(endpoint, body)
      .then(response => response)
      .catch(error => Promise.reject({ error }));

    return request;
  };

  patch = (path, body = {}) => {
    const endpoint = this.composeUrl(path);

    const request = axios.patch(endpoint, body)
      .then(response => response)
      .catch(error => Promise.reject({ error }));

    return request;
  };
}
