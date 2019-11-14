import React from 'react';

import { ThreadComponent } from '../TreadComponent';
import { threadService } from '../../services';
import Loader from '../Loader/Loader';

export class ThreadViewPage extends React.Component {
	state = {
		thread: null
	};

	componentDidMount() {
		console.log({ ...this.props });

		const {
			match: {
				params: { id }
			}
		} = this.props;

		threadService.getThread(id).then(data => {
			this.setState({ thread: data });
		});
	}

	render() {
		const { thread } = this.state;
		if (!thread) return <Loader />;

		return <ThreadComponent threadView="full" thread={thread} />;
	}
}
