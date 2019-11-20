import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import HeaderComponent from './Header';


const mapStateToProps = (state) => {

};

const mapDispatchToProps = (dispatch) => {

};

export const Header = withRouter(HeaderComponent);
// export const Header = withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderComponent));

