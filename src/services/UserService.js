import { pathList } from './constants';

export class UserService {
  constructor(adapter) {
    this._adapter = adapter;
    this._baseUrl = pathList.user.base;
  }

  getCurrentUser = (params) => {
    return this._adapter.get(this._baseUrl, params).then(({ data }) => ({ data }));
  };
}