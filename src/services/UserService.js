import { pathList } from './constants';
import { GoogleAuthService } from './GoogleAuthService';
export class UserService {
	constructor(adapter) {
		this._adapter = adapter;
		this._baseUrl = pathList.user.base;
		this._loginUrl = pathList.user.login;
	}

	loginUser = () =>
		GoogleAuthService.signIn().then(data => this._adapter.post(this._loginUrl, data).then(({ data }) => data));
		
	signOut = () => GoogleAuthService.signOut();
}
