import { SET_USER, LOG_OUT } from '../types/userTypes';

const initialState = {
	user: null
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return { user: action.user };

		case LOG_OUT:
			return initialState;

		default:
			return state;
	}
};

export default userReducer;
