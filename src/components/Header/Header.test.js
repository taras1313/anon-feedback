import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from './Header';
import { SearchBar } from './Header';
import { BrowserRouter as Router } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ManipulateThreadComponent } from '../ManipulateThreadComponent';
import Button from '@material-ui/core/Button';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

describe('Header component', () => {

  afterEach(() => jest.clearAllMocks());
  
  test('Create Thread Modal', () => {

    const wrapper = shallow(<Header />);

    wrapper.find(Button).props().onClick();
    wrapper.find(ManipulateThreadComponent).props().onClose();

    // expect(mockSetState).toHaveBeenCalledWith(true);
  })

	test('Search bar snapshot', () => {
		const wrapper = mount(
			<Router history={history}>
				<SearchBar />
			</Router>
		);

		expect(wrapper).toMatchSnapshot();
  });
  
  test('Search bar rest', () => {
    const wrapper = mount(
			<Router history={history}>
				<SearchBar />
			</Router>
    );
    
    wrapper.find(Autocomplete).props().renderOption({title: 'test'});
    wrapper.find(Autocomplete).props().getOptionLabel({title: 'test'});
    wrapper.find(Autocomplete).props().onChange({}, {_id: 'test'});
  });
});
