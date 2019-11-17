import { pathList } from './constants';

export class ThreadService {
  constructor(adapter) {
    this._adapter = adapter;
    this._baseUrl = pathList.thread.base;
  }

  getThreads = (params) => {
    return this._adapter.get(this._baseUrl, params).then(({ data }) => data);
  };

  getThread = (id) => {
    return this._adapter.get(`${this._baseUrl}/${id}`).then(({ data }) => (data));
  };

  createThread = (thread) => {
    return this._adapter.post(`${this._baseUrl}/create`, thread).then(({ data }) => ( data ));
  };

  updateThread = (thread) => {
    return this._adapter.patch(`${this._baseUrl}/update`, thread).then(({ data }) => ( data ));
  };

  subscribeToThread = (params) => {
    return this._adapter.patch(`${this._baseUrl}/subscribe`, params).then(({ data }) => ( data ));
  };

  unsubscribeFromThread = (params) => {
    return this._adapter.patch(`${this._baseUrl}/unsubscribe`, params).then(({ data }) => ( data ));
  };
}
