import React from "react";
import { shallow } from "enzyme";
import Button from "@material-ui/core/Button";
import PersonalCabinetPage from "./PersonalCabinetPage";
jest.mock("../../services");

// eslint-disable-next-line import/first
import { threadService } from "../../services";

describe("Personal cabinet page", () => {
  const props = { user: { repliedList: [{ threadId: 1 }] } };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("snapshot", () => {
    const wrapper = shallow(<PersonalCabinetPage {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(threadService.getSubscribed).toHaveBeenCalled();
  });

  test("gets subscribed threads", () => {
    const wrapper = shallow(<PersonalCabinetPage {...props} />);
    wrapper.find(Button).at(0).simulate("click");
    expect(threadService.getSubscribed).toHaveBeenCalledTimes(2);
  });

  test("gets liked threads", () => {
    const wrapper = shallow(<PersonalCabinetPage {...props} />);
    wrapper.find(Button).at(1).simulate("click");
    expect(threadService.getLiked).toHaveBeenCalledTimes(1);
  });

  test("gets created threads", () => {
    const wrapper = shallow(<PersonalCabinetPage {...props} />);
    wrapper.find(Button).at(2).simulate("click");
    expect(threadService.getCreated).toHaveBeenCalledTimes(1);
  });

  test("gets replied threads", () => {
    const wrapper = shallow(<PersonalCabinetPage {...props} />);
    wrapper.find(Button).at(3).simulate("click");
    expect(threadService.getReplied).toHaveBeenCalledTimes(1);
  });
});
