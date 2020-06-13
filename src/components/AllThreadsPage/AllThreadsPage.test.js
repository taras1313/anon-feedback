import React from "react";
import { shallow } from "enzyme";
import { AllThreadsPage } from "./AllThreadsPage";
import { ThreadComponent } from "../TreadComponent";
import Button from "@material-ui/core/Button";

describe("AllThreadsPage", () => {
  const props = {
    threads: [
      {
        name: "dsfsf",
        _id: 1,
        likesCount: 1,
        commentsCount: 1,
        createdDate: "11/20/2015",
      },
      {
        name: "asdad",
        _id: 2,
        likesCount: 2,
        commentsCount: 0,
        createdDate: "13/20/2015",
      },
    ],
    actions: { getAllThreads: () => {} },
  };

  test("snapshot", () => {
    const wrapper = shallow(<AllThreadsPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("sort by newest", () => {
    const wrapper = shallow(<AllThreadsPage {...props} />);
    wrapper
      .find(Button)
      .at(1)
      .props()
      .onClick({ currentTarget: { name: 'Most Liked' } });
    console.log(wrapper.find(ThreadComponent).at(0).props());
    expect(wrapper.find(ThreadComponent).at(0).props().thread._id).toBe(2);
  });
});
