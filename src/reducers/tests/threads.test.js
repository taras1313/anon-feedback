import {
  UPDATE_THREAD_FIELD,
  RESET_THREAD,
  SET_THREAD_DATA,
  SET_SELECTED_THREAD,
  SET_ALL_THREADS,
  CHANGE_THREAD,
} from "../../types/threadTypes";

import { initialState, threadsReducer } from "../threadsReducer";

const TEST_VALUE = "testValue";

const scenarios = [
  { action: { type: "noSuchType" }, expected: initialState },
  { action: { type: RESET_THREAD }, expected: initialState },
  {
    action: {
      type: UPDATE_THREAD_FIELD,
      payload: { field: "testField", value: TEST_VALUE },
    },
    expected: {
      ...initialState,
      threadData: {
        ...initialState.threadData,
        testField: TEST_VALUE,
      },
    },
  },
  {
    action: { type: SET_SELECTED_THREAD, payload: TEST_VALUE },
    expected: { ...initialState, selectedThread: TEST_VALUE },
  },
  {
    action: { type: SET_ALL_THREADS, payload: TEST_VALUE },
    expected: { ...initialState, threads: TEST_VALUE },
  },
  {
    action: {
      type: SET_THREAD_DATA,
      payload: { text: "testText", _id: "testId", title: "testTitle" },
    },
    expected: {
      ...initialState,
      threadData: {
        ...initialState.threadData,
        text: "testText",
        _id: "testId",
        title: "testTitle",
      },
    },
  },
  {
    action: {
      type: CHANGE_THREAD,
      payload: { id: 2, thread: { id: 2 } },
    },
    expected: {
      ...initialState,
      selectedThread: { id: 2 },
      threads: [{ id: 2 }],
    },
  },
];

scenarios.forEach(({ action, expected }) => {
  if (action.type === CHANGE_THREAD) {
    expect(
      threadsReducer({ ...initialState, threads: [{ _id: 2 }] }, action)
    ).toEqual(expected);
  } else {
    it(`should be \`${JSON.stringify(expected)}\` when the \`${
      action.type
    }\` action is handled`, () => {
      expect(threadsReducer(undefined, action)).toEqual(expected);
    });
  }
});
