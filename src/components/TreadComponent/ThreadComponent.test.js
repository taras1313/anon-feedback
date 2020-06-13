import React from 'react';
import { ThreadComponent } from './ThreadComponent';
import { CreateCommentComponent } from '../CreateCommentComponent';
import { CommentComponent } from '../CommentComponent';
import { ManipulateThreadComponent } from '../ManipulateThreadComponent';
import { ThreadAuditComponent } from '../ThreadAuditComponent';
import { shallow } from 'enzyme';

window.scrollTo = jest.fn();

describe('Thread Component', () => {
	const testAuthor = { userId: 1 };
	const props = {
		userId: 1,
		thread: {
			users: [
				{
					userId: 1
				}
			],
			likesList: [{ userId: 1 }],
			commentsList: [{ text: 'test', author: testAuthor }],
			subscribers: [{ userId: 1 }],
			author: testAuthor
		}
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('renders properly with no props', () => {
		const wrapper = shallow(<ThreadComponent threadView="preview" />);

		expect(wrapper).toMatchSnapshot();
	});

	test('renders properly with no props', () => {
		const wrapper = shallow(<ThreadComponent />);
		
		expect(wrapper).toMatchSnapshot();
	});
	
	test('default thread likes', () => {
		const wrapper = shallow(<ThreadComponent />);

		 wrapper.find(ThreadAuditComponent).props().like();
		 wrapper.find(ThreadAuditComponent).props().dislike();
	});

	test('subscribe to thread works', () => {
		const subscribeToThread = jest.fn();

		const wrapper = shallow(
			<ThreadComponent
				actions={{ subscribeToThread: subscribeToThread }}
				thread={{ ...props.thread, dislikesList: [{ userId: 1 }] }}
			/>
		);

		wrapper.find("[data-testid='subscribeButton']").simulate('click');
		expect(subscribeToThread).toHaveBeenCalledTimes(1);
	});

	test('unsubscribe from thread works', () => {
		const unsubscribeFromThread = jest.fn();
		const wrapper = shallow(
			<ThreadComponent {...props} actions={{ unsubscribeFromThread: unsubscribeFromThread }} />
		);

		wrapper.find("[data-testid='subscribeButton']").simulate('click');
		expect(unsubscribeFromThread).toHaveBeenCalledTimes(1);
	});

	test('thread edit', () => {
		const unsubscribeFromThread = jest.fn();
		const wrapper = shallow(
			<ThreadComponent
				{...props}
				actions={{ unsubscribeFromThread: unsubscribeFromThread, setThreadData: jest.fn() }}
			/>
		);

		wrapper.find("[data-testid='editThread']").simulate('click');
		expect(wrapper.state().editThreadOpen).toBe(true);
		wrapper.find(ManipulateThreadComponent).props().onClose();
		expect(wrapper.state().editThreadOpen).toBe(false);
	});

	test('replied to', () => {
		const wrapper = shallow(<ThreadComponent {...props} />);

		wrapper.find("[data-testid='comment']").props().repliedToHandler('test');
		expect(wrapper.state().repliedTo).toBe('test');
	});

	test('comment', () => {
		const wrapper = shallow(<ThreadComponent {...props} />);

		wrapper.find(CreateCommentComponent).props().onRepliedToReset();
		wrapper.find(CommentComponent).props().likeComment();
		wrapper.find(CommentComponent).props().dislikeComment();

		expect(wrapper.state().repliedTo).toBe('');
	});
});
