import React from "react";
import { ThreadViewPage } from "./ThreadViewPage";
import { shallow } from "enzyme";
import Loader from '../Loader/Loader';

const props = {
  actions: { getThreadById: jest.fn(() => "newTestId") },
  match: {
    params: { id: "testId" },
  },
  thread: {},
};

describe("ThreadViewPage", () => {
  test("snapshot", () => {
    const wrapper = shallow(<ThreadViewPage {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("did mount", () => {
    shallow(<ThreadViewPage {...props} />);

    expect(props.actions.getThreadById).toHaveBeenCalledWith("testId");
  });

  test("did mount", () => {
    const wrapper = shallow(<ThreadViewPage {...props} />);
    wrapper.setProps({
      match: {
        params: { id: "newTestId" },
      },
    });

    expect(props.actions.getThreadById).toHaveBeenCalledWith("newTestId");
  });

  test("no thread", () => {
    const wrapper = shallow(<ThreadViewPage {...props} thread={null} />);

    expect(wrapper.find(Loader)).toHaveLength(1);
  });
});
