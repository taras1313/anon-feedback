import { pathList } from './constants';

export class ThreadService {
  constructor(adapter) {
    this._adapter = adapter;
    this._baseUrl = pathList.thread.base;
  }

  getThreads = (params) => {
    return this._adapter.get(this._baseUrl, params).then(({ data }) => ({ data }));
  };
}