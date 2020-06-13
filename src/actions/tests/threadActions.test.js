import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../threadActions";

import {
  UPDATE_THREAD_FIELD,
  RESET_THREAD,
  SET_THREAD_DATA,
  SET_SELECTED_THREAD,
  SET_ALL_THREADS,
  CHANGE_THREAD,
} from "../../types/threadTypes";

jest.mock("../../services");

// eslint-disable-next-line import/first
import { threadService } from "../../services";

const MOCK_USER_ID = "mockUserId";
const MOCK_THREAD_DATA = {
  title: "mockTitle",
  text: "mockText",
  users: [{ userId: MOCK_USER_ID }],
  author: { userId: MOCK_USER_ID },
};

const mockStore = configureMockStore([thunk]);

describe("async thread actions", () => {
  afterEach(() => {
    store.clearActions();
  });

  const store = mockStore({
    threadsReducer: {
      selectedThread: {
        _id: "selectedThreadId",
        users: [
          {
            username: "repliedToUsername",
          },
        ],
      },
      threadData: MOCK_THREAD_DATA,
    },
    userReducer: {
      user: { _id: MOCK_USER_ID },
    },
  });

  test("createThread", async () => {
    const createdThread = await store.dispatch(
      actions.createThread(MOCK_THREAD_DATA)
    );
    expect(createdThread).toEqual({
      ...MOCK_THREAD_DATA,
      subscribers: [{ userId: MOCK_USER_ID }],
    });
  });

  test("editThread", async () => {
    const editedThread = await store.dispatch(
      actions.editThread(MOCK_THREAD_DATA)
    );

    expect(threadService.updateThread).toHaveBeenCalledWith(MOCK_THREAD_DATA);
    expect(editedThread).toEqual({
      ...MOCK_THREAD_DATA,
    });
  });

  test("createComment", async () => {
    await store.dispatch(
      actions.onCreateComment({
        nickName: "mockUsername",
        commentText: "mockText",
        repliedTo: "repliedToUsername",
      })
    );

    expect(threadService.createComment).toHaveBeenCalledWith({
      username: "mockUsername",
      threadId: "selectedThreadId",
      userId: "mockUserId",
      text: "mockText",
      repliedToUser: { username: "repliedToUsername" },
    });

    expect(store.getActions()[0].type).toEqual(SET_SELECTED_THREAD);
  });

  test("updateComment", async () => {
    await store.dispatch(
      actions.onUpdateComment({
        commentId: "mockCommentId",
        text: "mockText",
      })
    );

    expect(threadService.updateComment).toHaveBeenCalledWith({
      commentId: "mockCommentId",
      text: "mockText",
      threadId: "selectedThreadId",
    });

    expect(store.getActions()[0].type).toEqual(SET_SELECTED_THREAD);
  });

  test("getThreadById", async () => {
    await store.dispatch(actions.getThreadById("mockId"));

    expect(threadService.getThread).toHaveBeenCalledWith("mockId");

    expect(store.getActions()[0].type).toEqual(SET_SELECTED_THREAD);
  });

  test("subscribeToThread", async () => {
    await store.dispatch(
      actions.subscribeToThread({ thread: MOCK_THREAD_DATA })
    );

    expect(threadService.subscribeToThread).toHaveBeenCalledWith({
      thread: MOCK_THREAD_DATA,
    });

    expect(store.getActions()[0]).toEqual({
      type: SET_SELECTED_THREAD,
      payload: MOCK_THREAD_DATA,
    });
  });

  test("unsubscribeFromThread", async () => {
    await store.dispatch(
      actions.unsubscribeFromThread({ thread: MOCK_THREAD_DATA })
    );

    expect(threadService.unsubscribeFromThread).toHaveBeenCalledWith({
      thread: MOCK_THREAD_DATA,
    });

    expect(store.getActions()[0]).toEqual({
      type: SET_SELECTED_THREAD,
      payload: MOCK_THREAD_DATA,
    });
  });

  test("getThreads", async () => {
    await store.dispatch(actions.getAllThreads());

    expect(threadService.getThreads).toHaveBeenCalled();

    expect(store.getActions()[0]).toEqual({
      type: SET_ALL_THREADS,
      payload: [{}],
    });
  });

  test("like", async () => {
    await store.dispatch(
      actions.like({ id: "mockThreadId", userId: MOCK_USER_ID })
    );

    expect(threadService.like).toHaveBeenCalled();

    expect(store.getActions()[0].type).toEqual(CHANGE_THREAD);
  });

  test("dislike", async () => {
    await store.dispatch(
      actions.dislike({ id: "mockThreadId", userId: MOCK_USER_ID })
    );

    expect(threadService.dislike).toHaveBeenCalled();

    expect(store.getActions()[0].type).toEqual(CHANGE_THREAD);
  });

  test("likeComment", async () => {
    await store.dispatch(
      actions.likeComment({ id: "mockThreadId", userId: MOCK_USER_ID })
    );

    expect(threadService.likeComment).toHaveBeenCalled();

    expect(store.getActions()[0].type).toEqual(CHANGE_THREAD);
  });

  test("dislikeComment", async () => {
    await store.dispatch(
      actions.dislikeComment({ id: "mockThreadId", userId: MOCK_USER_ID })
    );

    expect(threadService.dislikeComment).toHaveBeenCalled();

    expect(store.getActions()[0].type).toEqual(CHANGE_THREAD);
  });
});
