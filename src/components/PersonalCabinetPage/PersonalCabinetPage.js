import React, { Component } from 'react';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { threadService } from '../../services';
// getSubscribed, getLiked, getCreated

const SUBSCRIBED = 'SUBSCRIBED';
const LIKED = 'LIKED';
const CREATED = 'CREATED';

const threadOptions = [SUBSCRIBED, LIKED, CREATED];

export default class PersonalCabinetPage extends Component {
	componentDidMount() {}

	optionChangeHandler = option => {};

	renderButtons() {
		return threadOptions.map(label => (
			<Button
				key={label}
				onClick={this.optionChangeHandler()}
				name={label}
				// className={this.isActive(label) ? styles.active : ''}
			>
				{/* <div className={styles.iconWrapper}>{icon}</div> */}
				{label}
				{/* <div className={styles.iconWrapper}>
				</div> */}
			</Button>
		));
	}

	render() {
		return (
			<div className={styles.buttonContainer}>
				<ButtonGroup size="small" aria-label="small outlined button group" color="primary">
					{this.renderButtons()}
				</ButtonGroup>
			</div>
		);
	}
}
