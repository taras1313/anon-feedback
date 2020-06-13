import { combineReducers } from 'redux';
import userReducer from './userReducer';
import threadsReducer from './threadsReducer';

export default combineReducers({ userReducer, threadsReducer });
