import { NotificationManager } from 'react-notifications';
import { threadService } from '../services';
import { CreateThreadModel } from '../models/createThreadModel';
import {
	UPDATE_THREAD_FIELD,
	RESET_THREAD,
	SET_THREAD_DATA,
	SET_SELECTED_THREAD,
	SET_ALL_THREADS,
	CHANGE_THREAD
} from '../types/threadTypes';

import { setUser } from '../actions/userActions';

export const updateThreadField = payload => ({ type: UPDATE_THREAD_FIELD, payload });
export const resetThreadFields = () => ({ type: RESET_THREAD });
export const createThread = () => (dispatch, getState) => {
	const {
		threadsReducer: { threadData },
		userReducer: {
			user: { _id: authorId }
		}
	} = getState();

	const thread = new CreateThreadModel({ ...threadData, authorId });

  return threadService.createThread(thread).then((data) => {
    NotificationManager.success('Your thread was created', 'Success');
    return data;
  });
};

export const editThread = () => (dispatch, getState) => {
	const {
		threadsReducer: {
			threadData: { username, ...data }
		}
	} = getState();

  return threadService.updateThread(data).then((data) => {
    NotificationManager.success('Your thread was edited', 'Success');
    return data;
  });
};

export const onCreateComment = ({ nickName: username, commentText: text, repliedTo }) => (dispatch, getState) => {
  const {
    userReducer: {
      user: { _id: userId },
    },
    threadsReducer: {
      selectedThread: { _id: threadId },
      selectedThread
    }
  } = getState();

  const repliedToUser = selectedThread.users.find(el => el.username === repliedTo);

  const params = { userId, threadId, username, text, repliedToUser };

  return threadService.createComment(params).then(data => {
    dispatch(setSelectedThread(data));
    NotificationManager.success('Your comment was created', 'Success');
  });
};

export const onUpdateComment = ({ commentId, text }) => (dispatch, getState) => {
  const { threadsReducer: { selectedThread: { _id: threadId } } } = getState();
  const params = { threadId, commentId, text };

  return threadService.updateComment(params).then(data => {
    NotificationManager.success('Your comment was updated', 'Success');
    dispatch(setSelectedThread(data));
  });
};

export const setThreadData = payload => ({ type: SET_THREAD_DATA, payload });

export const setSelectedThread = payload => ({ type: SET_SELECTED_THREAD, payload });

export const setAllThreads = payload => ({ type: SET_ALL_THREADS, payload });
export const changeThread = payload => ({ type: CHANGE_THREAD, payload });

export const getThreadById = id => dispatch => {
	threadService.getThread(id).then(data => dispatch(setSelectedThread(data)));
};

// i know, this is duplication, but so it is easier to follow
export const subscribeToThread = (data) => (dispatch) => {
  threadService.subscribeToThread(data).then(res => {
    NotificationManager.info('subscribed to this thread', 'Info');
    dispatch(setSelectedThread(res.thread))
    dispatch(setUser(res.user))
  })
};

export const unsubscribeFromThread = (data) => (dispatch) => {
  threadService.unsubscribeFromThread(data).then(res => {
    NotificationManager.info('unsubscribed from this thread', 'Info');
    dispatch(setSelectedThread(res.thread))
    dispatch(setUser(res.user))
  })
};

export const getAllThreads = () => dispatch => {
	threadService.getThreads().then(data => dispatch(setAllThreads(data)));
};

export const like = (payload) => (dispatch) => {
  const { id, userId } = payload;

  threadService.like({ id, userId }).then(data => {
    NotificationManager.success('You\'ve liked thread', 'Success');
    dispatch(changeThread({ id, thread: { ...data } }))
  });
};

export const dislike = (payload) => (dispatch) => {
  const { id, userId } = payload;
  threadService.dislike({ id, userId }).then(data => {
    NotificationManager.success('You\'ve disliked thread', 'Success');
    dispatch(changeThread({ id, thread: { ...data } }));
  });
};
