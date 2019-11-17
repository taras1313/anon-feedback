import React from 'react';

import { ThreadComponent } from '../TreadComponent';
import { threadService } from '../../services';
import Loader from '../Loader/Loader';

export class ThreadViewPage extends React.Component {
	componentDidMount() {
		const {
			actions: { getThreadById },
			match: {
				params: { id }
			}
		} = this.props;
		getThreadById(id);
	}

	render() {
		const { thread } = this.props;
		if (!thread) return <Loader />;

		return <ThreadComponent threadView="full" {...this.props} />;
	}
}
