import React from 'react';
import Loader from './Loader';
import { shallow } from 'enzyme';

describe('Loader component', () => {
	test('render', () => {
		const wrapper = shallow(<Loader />);

		expect(wrapper).toMatchSnapshot();
	});
});
