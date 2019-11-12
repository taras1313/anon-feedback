import { combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';

const initialState = {};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default combineReducers({ appReducer, userReducer });
