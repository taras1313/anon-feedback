import React from 'react';
import { shallow } from 'enzyme';
import { CreateCommentComponent } from './CreateCommentComponent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { BrowserRouter as Router } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

describe('Header component', () => {
	const setIsChecked = jest.fn();
	const setNickName = jest.fn();
	const onCreateComment = jest.fn().mockImplementation(() => ({ then: jest.fn() }));
	const setCommentText = jest.fn();
	const useState = jest.spyOn(React, 'useState');

	afterEach(() => jest.clearAllMocks());

	test('renders w/o props', () => {
		const wrapper = shallow(<CreateCommentComponent />);

		expect(wrapper).toMatchSnapshot();
	});

	test('Create Comment Component use state', () => {
		useState.mockImplementationOnce(() => [true, setIsChecked]);

		const wrapper = shallow(<CreateCommentComponent />);

		wrapper.find("[data-testid='here']").simulate('click');

		expect(setIsChecked).toHaveBeenCalled();
	});

	test('fake name', () => {
		useState.mockImplementationOnce(() => [false, setIsChecked]);
		useState.mockImplementationOnce(() => [true, setNickName]);

		const wrapper = shallow(<CreateCommentComponent />);

		wrapper.find(FormControlLabel).props().control.props.onChange();
		expect(setIsChecked).toHaveBeenCalledWith(true);
		expect(setNickName).toHaveBeenCalledTimes(1);
	});

	test('branches', () => {
		useState.mockImplementationOnce(() => [true, setIsChecked]);
		useState.mockImplementationOnce(() => [true, setNickName]);

		const wrapper = shallow(
			<CreateCommentComponent onRepliedToReset={jest.fn()} onCreateComment={onCreateComment} repliedTo />
		);

		wrapper.find(FormControlLabel).props().control.props.onChange();
		expect(setIsChecked).toHaveBeenCalledWith(false);
		expect(setNickName).toHaveBeenCalledTimes(1);

		wrapper.find(Button).at(1).props().onClick();
		expect(onCreateComment).toHaveBeenCalledTimes(1);
	});

	test('creates comment', () => {
		const wrapper = shallow(<CreateCommentComponent onCreateComment={onCreateComment} />);

		wrapper.find(Button).at(1).props().onClick();
		expect(onCreateComment).toHaveBeenCalledTimes(1);
	});

	test('updates comment and username', () => {
		useState.mockImplementationOnce(() => [true, setIsChecked]);
		useState.mockImplementationOnce(() => [true, setNickName]);
		useState.mockImplementationOnce(() => [true, setCommentText]);

		const wrapper = shallow(<CreateCommentComponent />);

		const event = { target: { value: 'test' } };

		wrapper.find(TextField).at(1).props().onChange(event);
		wrapper.find(TextField).at(0).props().onChange(event);

		expect(setCommentText).toHaveBeenCalledWith('test');
		expect(setNickName).toHaveBeenCalledWith('test');
	});
});
