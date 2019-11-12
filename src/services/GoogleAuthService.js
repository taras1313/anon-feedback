export class GoogleAuthService {

  static signIn = () => {
    const GoogleAuth = window.gapi.auth2.getAuthInstance();

    return GoogleAuth.signIn();
  }

  static signOut = () => {
    const GoogleAuth = window.gapi.auth2.getAuthInstance();

    return GoogleAuth.signOut();
  }
}
