import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Header } from '../Header';
import Navbar from '../Navbar/Navbar';
// import { ThreadComponent } from '../TreadComponent';

import { ThreadViewPage } from '../ThreadViewPage';
import { AllThreadsPage } from '../AllThreadsPage';
import { PersonalCabinetPage } from '../PersonalCabinetPage';

import styles from './Layout.module.scss';
import { userService } from '../../services/index';

const Feed = () => <p>Feed</p>;

class LoginPage extends React.Component {
	loginHandler = () => {
		userService
			.loginUser()
			.then(user => this.props.setUser(user))
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
          <Route path="/" exact component={AllThreadsPage} />
          <Route path="/feed/:id" component={ThreadViewPage} />
          <Route path="/feed" component={Feed} />
          <Route path="/cabinet" component={PersonalCabinetPage} />
        </Switch>
      </div>
    </>
  );
}
