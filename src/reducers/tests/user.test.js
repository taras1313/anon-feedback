import { initialState, userReducer } from "../userReducer";
import { SET_USER, LOG_OUT } from "../../types/userTypes";

describe("user reducer", () => {
  test("all", () => {
    expect(
      userReducer(undefined, { type: SET_USER, user: "testUser" })
    ).toEqual({
      ...initialState,
      user: "testUser",
    });

    expect(userReducer(undefined, { type: LOG_OUT })).toEqual(initialState);
    expect(userReducer(undefined, { type: 'noSuchType' })).toEqual(initialState);
  });
});
