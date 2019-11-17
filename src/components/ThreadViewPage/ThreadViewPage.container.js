import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ThreadViewPage as ThreadView } from './ThreadViewPage';
import {
  setThreadData,
  subscribeToThread,
  unsubscribeFromThread,
  getThreadById
} from '../../actions/threadActions';

const mapStateToProps = (
  {
    userReducer: { user: { _id } },
    threadsReducer: { selectedThread }
  }
) => ({ userId: _id, thread: selectedThread });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    setThreadData,
    subscribeToThread,
    unsubscribeFromThread,
    getThreadById
  }, dispatch)
});

export const ThreadViewPage = connect(mapStateToProps, mapDispatchToProps)(ThreadView);

