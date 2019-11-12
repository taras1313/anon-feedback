import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';

import styles from './Layout.module.scss';
import { userService } from '../../services/index';

const Feed = () => <p>Feed</p>;
const Cabinet = () => <p>Personal Cabinet</p>;
const Threads = () => <p>All Threads</p>;
const ThreadPage = ({ match }) => <p>You have chosen thread with id value {match.params.id}</p>;

class LoginPage extends React.Component {
	loginHandler = () => {
		userService
			.loginUser()
			.then(user => {
				this.props.setUser(user);
			})
			.catch(err => console.log(err));
	};

	logOutHandler = () => userService.signOut().then(() => this.props.logOut());

	render() {
		return <button onClick={this.loginHandler}>Kek in</button>;
	}
}

export default function Layout({ isUserLoggedIn, setUser }) {
	if (!isUserLoggedIn) return <LoginPage setUser={setUser} />;
	return (
		<>
			<Header />
			<Navbar />
			<div className={styles.mainWrapper}>
				<Switch>
					<Route path="/" exact component={Threads} />
					<Route path="/feed/:id" component={ThreadPage} />
					<Route path="/feed" component={Feed} />
					<Route path="/cabinet" component={Cabinet} />
				</Switch>
			</div>
		</>
	);
}
