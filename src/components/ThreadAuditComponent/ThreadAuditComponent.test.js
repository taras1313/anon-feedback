import React from 'react';
import { ThreadAuditComponent } from './ThreadAuditComponent';
import { shallow } from 'enzyme';

describe('threadAuditComponent', () => {
	test('renders w/o props', () => {
		const wrapper = shallow(<ThreadAuditComponent />);

		expect(wrapper).toMatchSnapshot();
	});

	test('like and dislike work as expected', () => {
		const like = jest.fn();
		const dislike = jest.fn();
		const wrapper = shallow(<ThreadAuditComponent like={like} dislike={dislike} isClickable />);

		wrapper.find("[data-testid='like-button']").simulate('click');
		expect(like).toHaveBeenCalled();

		wrapper.find("[data-testid='dislike-button']").simulate('click');
		expect(dislike).toHaveBeenCalled();
	});
});
