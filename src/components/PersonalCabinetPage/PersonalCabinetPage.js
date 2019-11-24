import React, { Component } from 'react';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { threadService } from '../../services';
import Loader from '../Loader/Loader';
import { ThreadComponent } from '../TreadComponent';

import styles from './PersonalCabinetPage.module.scss';

const SUBSCRIBED = 'SUBSCRIBED';
const LIKED = 'LIKED';
const CREATED = 'CREATED';
const REPLIED = 'REPLIED';

const threadOptions = [SUBSCRIBED, LIKED, CREATED, REPLIED];

export default class PersonalCabinetPage extends Component {
	state = {
		threads: [],
		option: SUBSCRIBED
	};

	componentDidMount() {
		const {
			user: { subscribedThreads }
		} = this.props;
		threadService.getSubscribed(subscribedThreads).then(res => {
			this.setState({ threads: res });
		});
	}

	renderThreads() {
		const { threads } = this.state;
		return threads.map(el => <ThreadComponent key={el._id} threadView="preview" thread={el} />);
	}

	optionChangeHandler = option => {
		const {
			user: { createdThreads, subscribedThreads, _id, repliedList }
		} = this.props;

		console.log('subbed threads', subscribedThreads);
		const switchOption = () => {
			switch (option) {
				case SUBSCRIBED:
					return threadService.getSubscribed(subscribedThreads);

				case LIKED:
					return threadService.getLiked(_id);

				case CREATED:
					return threadService.getCreated(createdThreads);

				case REPLIED:
					const repliedArr = repliedList.map(({ threadId }) => threadId);
					return threadService.getReplied(repliedArr);

				default:
					break;
			}
		};

		switchOption().then(res => {
			console.log('res', res);
			this.setState({ threads: res, option });
		});
	};

	isActive = label => this.state.option === label;

	renderButtons() {
		return threadOptions.map(label => (
			<Button
				key={label}
				onClick={() => this.optionChangeHandler(label)}
				name={label}
				className={this.isActive(label) ? styles.active : ''}
			>
				{label}
			</Button>
		));
	}

	render() {
		const { threads } = this.state;

		return (
			<>
				<div className={styles.buttonContainer}>
					<ButtonGroup size="small" aria-label="small outlined button group" color="primary">
						{this.renderButtons()}
					</ButtonGroup>
				</div>
				{threads.length ? this.renderThreads() : <Loader />}
			</>
		);
	}
}
