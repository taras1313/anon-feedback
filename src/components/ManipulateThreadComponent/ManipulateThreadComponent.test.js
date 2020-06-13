import React from "react";
import { ManipulateThreadComponent } from "./ManipulateThreadComponent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { shallow } from "enzyme";
// import { createMemoryHistory } from 'history';

// const history = createMemoryHistory();

describe("threadAuditComponent", () => {
  const props = {
    onClose: () => {},
    actions: {
      updateThreadField: jest.fn(),
      createThread: jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve({ thread: "testThread", user: "testUser" })
        ),
      editThread: jest
        .fn()
        .mockImplementation(() => Promise.resolve("testData")),
      setSelectedThread: jest.fn(),
      setUser: jest.fn(),
    },
    history: {
      push: jest.fn(),
    },
    action: "create",
  };

  const useState = jest.spyOn(React, "useState");

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders w/o props", () => {
    const wrapper = shallow(<ManipulateThreadComponent />);

    expect(wrapper).toMatchSnapshot();
  });

  test("autocomplete", () => {
    const setIsChecked = jest.fn();
    useState.mockImplementationOnce(() => [true, setIsChecked]);
    const wrapper = shallow(<ManipulateThreadComponent {...props} />);
    wrapper.find(FormControlLabel).props().control.props.onChange();
    expect(props.actions.updateThreadField).toHaveBeenCalledTimes(1);
    expect(setIsChecked).toHaveBeenCalledWith(false);
  });

  test("autocomplete", () => {
    const setIsChecked = jest.fn();
    useState.mockImplementationOnce(() => [false, setIsChecked]);
    const wrapper = shallow(<ManipulateThreadComponent {...props} />);
    wrapper.find(FormControlLabel).props().control.props.onChange();
    expect(props.actions.updateThreadField).toHaveBeenCalledTimes(1);
    expect(setIsChecked).toHaveBeenCalledWith(true);
  });

  test("text field", () => {
    const wrapper = shallow(<ManipulateThreadComponent {...props} />);
    wrapper
      .find(TextField)
      .at(1)
      .props()
      .onChange({
        target: {
          value: "test",
          name: "test",
        },
      });
    expect(props.actions.updateThreadField).toHaveBeenCalledTimes(1);
  });

  test("manipulate thread create", async () => {
    const wrapper = shallow(<ManipulateThreadComponent {...props} />);

    wrapper.find(Button).at(1).props().onClick();

    await setTimeout(() => {}, 1);
    expect(props.actions.setUser).toHaveBeenCalledTimes(1);
  });

  test("manipulate thread edit", async () => {
    const wrapper = shallow(
      <ManipulateThreadComponent {...props} action="edit" />
    );

    wrapper.find(Button).at(1).props().onClick();

    await setTimeout(() => {}, 1);
    expect(props.actions.setSelectedThread).toHaveBeenCalledWith("testData");
  });

  test("manipulate thread edit", async () => {
    const wrapper = shallow(
      <ManipulateThreadComponent {...props} action="vbrost" />
    );

    wrapper.find(Button).at(1).props().onClick();
  });

  test("default methods", () => {
    const wrapper = shallow(<ManipulateThreadComponent action='create'/>);

    wrapper.find(Button).at(0).props().onClick();
    wrapper.find(FormControlLabel).props().control.props.onChange();
  });
});
