import { connect } from 'react-redux';

import component from './PersonalCabinetPage';

const mapStateToProps = state => {
	const {
		userReducer: { user }
  } = state;
  
  return {
    user
  };
};

export const PersonalCabinetPage = connect(mapStateToProps)(component);
