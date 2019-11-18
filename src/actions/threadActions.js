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

export const updateThreadField = (payload) => ({ type: UPDATE_THREAD_FIELD, payload });
export const resetThreadFields = () => ({ type: RESET_THREAD });
export const createThread = () => (dispatch, getState) => {
  const {
    threadsReducer: { threadData },
    userReducer: { user: { _id: authorId } }
  } = getState();

  const thread = new CreateThreadModel({ ...threadData, authorId });

  return threadService.createThread(thread);
};

export const editThread = () => (dispatch, getState) => {
  const {
    threadsReducer: { threadData: { username, ...data } },
  } = getState();

  return threadService.updateThread(data);
};

export const setThreadData = (payload) => ({ type: SET_THREAD_DATA, payload });
export const setSelectedThread = (payload) => ({ type: SET_SELECTED_THREAD, payload });
export const setAllThreads = (payload) => ({ type: SET_ALL_THREADS, payload });
export const changeThread = (payload) => ({ type: CHANGE_THREAD, payload });

export const getThreadById = (id) => (dispatch) => {
  threadService.getThread(id).then(data => dispatch(setSelectedThread(data)));
};

// i know, this is duplication, but so it is easier to follow
export const subscribeToThread = (data) => (dispatch) => {
  threadService.subscribeToThread(data).then(res => {
    dispatch(setSelectedThread(res))
  })
};

export const unsubscribeFromThread = (data) => (dispatch) => {
  threadService.unsubscribeFromThread(data).then(res => {
    dispatch(setSelectedThread(res))
  })
};

export const getAllThreads = () => (dispatch) => {
  threadService.getThreads().then(data => dispatch(setAllThreads(data)));
};

export const like = (payload) => (dispatch) => {
  const { id, userId } = payload;
  console.log(payload, 'payload');
  threadService.like({ id, userId }).then(data => dispatch(changeThread({id, thread: {...data}})))
}

export const dislike = (payload) => (dispatch) => {
  const { id, userId } = payload;
  threadService.dislike({ id, userId }).then(data => dispatch(changeThread({id, thread: {...data}})))
}
