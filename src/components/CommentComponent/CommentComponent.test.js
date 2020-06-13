import React from "react";
import { shallow } from "enzyme";
import { Comment } from "./CommentComponent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const props = {
  threadId: "1",
  userId: "2",
  likeComment: () => {},
  dislikeComment: () => {},
  comment: {
    likesList: ["2"],
    dislikesList: ["1"],
    _id: "3",
    text: "mockTest",
    likesCount: "10",
    dislikesCount: "20",
    createdDate: "01/20/2010",
    author: { username: "smallchanov" },
    repliedToUser: "tarasnormas",
  },
  editable: true,
  repliedToHandler: jest.fn(),
  classes: {},
};

describe("comment component", () => {
  test("snapshot", () => {
    const wrapper = shallow(<Comment {...props} editable={false} comment={{...props.comment, wasEdited: true}} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("dislike status", () => {
    shallow(<Comment {...props} dislikesList={["2"]} />);
  });

  test("toggle editing", () => {
    const wrapper = shallow(<Comment {...props} />);

    wrapper.find(Button).at(0).props().onClick();
    expect(wrapper.instance().state.isEditing).toBe(true);

    wrapper
      .find(TextField)
      .props()
      .onChange({ target: { value: "testValue" } });
    expect(wrapper.instance().state.text).toBe("testValue");

    wrapper.find(Button).at(0).props().onClick();
    expect(wrapper.instance().state.isEditing).toBe(false);
  });

  test('reply',  () => {
    const wrapper = shallow(<Comment {...props} isAuthorsComment />);

    wrapper.find(Button).at(1).props().onClick();

    expect(props.repliedToHandler).toHaveBeenCalledWith('smallchanov');
  });
});
