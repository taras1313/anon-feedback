import { SET_USER, LOG_OUT } from '../types/userTypes';

export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}

export function logOut() {
  return {
    type: LOG_OUT
  }
}
