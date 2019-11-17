import { combineReducers } from 'redux';
import userReducer from './userReducer';
import threadsReducer from './threadsReducer';

const initialState = {};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default combineReducers({ appReducer, userReducer, threadsReducer });
