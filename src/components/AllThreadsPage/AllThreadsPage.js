import React from 'react';

import { ThreadComponent } from '../TreadComponent';
import Loader from '../Loader/Loader';

export class AllThreadsPage extends React.Component {
  renderThreads() {
    const { threads } = this.props;

    return threads.map(el => <ThreadComponent key={el._id} threadView="preview" thread={el} />);
  }

  componentDidMount() {
    const {
      actions: { getAllThreads }
    } = this.props;
    getAllThreads()
  }

  render() {
    const { threads } = this.props;
    if (!threads.length) return <Loader />;

    return this.renderThreads();
  }
}
