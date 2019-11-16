import React from 'react';

import { ThreadComponent } from '../TreadComponent';
import { threadService } from '../../services';
import Loader from '../Loader/Loader';

export class AllThreadsPage extends React.Component {
	state = {
		threads: []
	};

	renderThreads() {
		const { threads } = this.state;

		return threads.map(el => <ThreadComponent thread={el}/>);
	}

	componentDidMount() {
		// const {
		// 	match: {
		// 		params: { id }
		// 	}
		// } = this.props;

		threadService.getThreads().then(data => {
			console.log(data, 'datum');
			
			this.setState({ threads: data });
		});
	}

	render() {
		const { threads } = this.state;
		if (!threads.length) return <Loader />;

		return(
			<>
			{this.renderThreads()}
			</>
		)
	}
}
