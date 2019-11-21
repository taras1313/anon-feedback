import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router-dom';

import { ManipulateThreadComponent as ManipulateThread } from './ManipulateThreadComponent';
import {
  updateThreadField,
  resetThreadFields,
  createThread,
  editThread,
  setSelectedThread
} from '../../actions/threadActions';

const mapStateToProps = ({ threadsReducer: { threadData } }) => ({ threadData });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    updateThreadField,
    resetThreadFields,
    createThread,
    editThread,
    setSelectedThread
  }, dispatch)
});

export const ManipulateThreadComponent = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ManipulateThread);

