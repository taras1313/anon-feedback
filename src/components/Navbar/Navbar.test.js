import React from 'react';
import Navbar from './Navbar';

import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { mount } from 'enzyme';
const history = createMemoryHistory();

describe('Navbar', () => {
	test('renders w/o props', () => {
		const wrapper = mount(
			<Router history={history}>
				<Navbar />
			</Router>
		);

		expect(wrapper).toMatchSnapshot();
	});
});
