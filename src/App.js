import React, { Component } from 'react';

import Layout from './components/Layout/Layout';

import { connect } from 'react-redux';
import { setUser, logOut } from './actions/userActions';

import './App.css';

class App extends Component {
	componentDidMount() {
		window.gapi.load('auth2', () => {
			window.gapi.auth2
				.init({
					client_id: '232822822071-1q970aukj04j6cv7p5buinsqs5vn0ks2'
				})
				.then(console.log);
		});
	}

	isUserLoggedIn = () => !!this.props.user;

	render() {
		const { setUser, logOut } = this.props.actions;

		return (
			<div className="App">
				<Layout isUserLoggedIn={this.isUserLoggedIn()} logOut={logOut} setUser={setUser} />
			</div>
		);
	}
}

const mapStateToProps = ({ userReducer: { user } }) => {
	return {
		user
	};
};

const mapDispatchToProps = dispatch => {
	return {
		actions: {
			setUser: user => dispatch(setUser(user)),
			logOut: () => dispatch(logOut())
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
