import {
  UPDATE_THREAD_FIELD,
  RESET_THREAD,
  SET_THREAD_DATA,
  SET_SELECTED_THREAD,
  SET_ALL_THREADS
} from '../types/threadTypes';

const initialState = {
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

const threadsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_THREAD_FIELD: {
      const { payload: { field, value } } = action;

      return {
        ...state,
        threadData: {
          ...state.threadData, [field]: value
        }
      };
    }

    case SET_SELECTED_THREAD: {
      const { payload: selectedThread } = action;

      return {
        ...state,
        selectedThread
      }
    }

    case SET_ALL_THREADS: {
      const { payload: threads } = action;

      return {
        ...state,
        threads
      }
    }

    case RESET_THREAD: {
      return { ...state, threadData: initialState.threadData };
    }

    case SET_THREAD_DATA: {
      const { payload: { text, _id, title } } = action;
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

    default:
      return state;
  }
};

export default threadsReducer;
