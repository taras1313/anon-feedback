import React from 'react';

import { ThreadComponent } from '../TreadComponent';
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
		const {
			thread,
			actions: { likeThread, dislikeThread }
		} = this.props;
		
		if (!thread) return <Loader />;

		return (
			<ThreadComponent likeThread={likeThread} dislikeThread={dislikeThread} threadView="full" {...this.props} />
		);
	}
}
