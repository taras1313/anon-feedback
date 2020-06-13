import React from 'react';

import { ThreadComponent } from '../TreadComponent';
import Loader from '../Loader/Loader';

export class ThreadViewPage extends React.Component {
	componentDidMount() {
		const {
			actions: { getThreadById } ,
			match: {
				params: { id }
			}
		} = this.props;
		getThreadById(id);
	}

	componentDidUpdate({match: {
		params: { id: prevId }
	}}) {

		const {
			actions: { getThreadById },
			match: {
				params: { id }
			}
		} = this.props;

		prevId !== id && getThreadById(id);
	}

	render() {
		const {
			thread,
			actions: { likeThread, dislikeThread, likeComment, dislikeComment }
		} = this.props;
		
		if (!thread) return <Loader />;

		return (
			<ThreadComponent likeThread={likeThread} dislikeThread={dislikeThread} likeComment={likeComment} dislikeComment={dislikeComment} threadView="full" {...this.props} />
		);
	}
}
