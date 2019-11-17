import { SET_USER, LOG_OUT } from '../types/userTypes';

const initialState = {
	user: {
		createdThreads: [],
		email: "tyakymiuk@griddynamics.com",
		subscribedThreads: [],
		__v: 0,
		_id: "5db078ddb266691dcc21c801"
	}
	// user: null
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
