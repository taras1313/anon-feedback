import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AllThreadsPage as AllThreads } from './AllThreadsPage';
import { getAllThreads } from '../../actions/threadActions';

const mapStateToProps = (
  {
    userReducer: { user: { _id } },
    threadsReducer: { threads }
  }
) => ({ userId: _id, threads });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getAllThreads
  }, dispatch)
});

export const AllThreadsPage = connect(mapStateToProps, mapDispatchToProps)(AllThreads);