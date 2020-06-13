import {
	UPDATE_THREAD_FIELD,
	RESET_THREAD,
	SET_THREAD_DATA,
	SET_SELECTED_THREAD,
  SET_ALL_THREADS,
	CHANGE_THREAD
} from '../types/threadTypes';

export const initialState = {
	threadData: {
		title: '',
		text: '',
		username: '',
		_id: ''
	},
	selectedThread: null,
	threads: []
};

// todo think about data flow from redux to thread and modal, current implementation is prototype

export const threadsReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_THREAD_FIELD: {
			const {
				payload: { field, value }
			} = action;

			return {
				...state,
				threadData: {
					...state.threadData,
					[field]: value
				}
			};
		}

		case SET_SELECTED_THREAD: {
			const { payload: selectedThread } = action;

			return {
				...state,
				selectedThread
			};
		}

		case SET_ALL_THREADS: {
			const { payload: threads } = action;

			return {
				...state,
				threads
			};
		}

		case RESET_THREAD: {
			return { ...state, threadData: initialState.threadData };
		}

		case SET_THREAD_DATA: {
			const {
				payload: { text, _id, title }
			} = action;
			return {
				...state,
				threadData: {
					...state.threadData,
					text,
					_id,
					title
				}
			};
		}

		case CHANGE_THREAD: {
			const {
				payload: { id, thread }
      } = action;
			
			const threadsCopy = [...state.threads]
			const foundThreadIndex = threadsCopy.findIndex(el => el._id === id);
			threadsCopy[foundThreadIndex] = thread;

			return {
				...state,
				threads: threadsCopy,
				selectedThread: thread
			};
		}

		default:
			return state;
	}
};

export default threadsReducer;
