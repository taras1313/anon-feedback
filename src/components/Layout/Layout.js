import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import { PersonalCabinetPage } from '../PersonalCabinetPage';
import { userService } from '../../services/index';
import { ReactComponent as Anonymous } from '../../assets/anonymous.svg';
import { ReactComponent as Google } from '../../assets/google.svg';
// import { ThreadComponent } from '../TreadComponent';
import { ThreadViewPage } from '../ThreadViewPage';
import { AllThreadsPage } from '../AllThreadsPage';

import styles from './Layout.module.scss';

class LoginPage extends Component {
  loginHandler = () => {
    userService
      .loginUser()
      .then(user => this.props.setUser(user))
      .catch(err => console.log(err));
  };

  logOutHandler = () => userService.signOut().then(() => this.props.logOut());

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.authPageHeader}>
          <div className={styles.welcome}>
            <div className={styles.imgWrapper}>
              <Anonymous className={styles.imgStyles} />
            </div>
            <div className={styles.welcomeTitle}>
              Welcome to Anon Feedback
            </div>
            <div className={styles.welcomeHint}>
              Please sign in to your account to start using the applications
            </div>
          </div>
        </div>
        <div className={styles.authPageMain}>
          <div className={styles.fields}>
            <Button
              variant="outlined"
              className={styles.button}
              onClick={this.loginHandler}
              classes={{
                root: styles.button,
              }}
            >
              <div className={styles.imgGoogleWrapper}>
                <Google className={styles.imgStyles} />
              </div>
              Log In with Google
            </Button>
          </div>
        </div>
        <div className={styles.authPageFooter}>
          <div className={styles.footerCopyright}>
            Annon Feedback © 2019
          </div>
        </div>
      </div>
    );
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
          <Route path="/cabinet" component={PersonalCabinetPage} />
        </Switch>
      </div>
    </>
  );
}

// import React from 'react';
// import { Route, Switch } from 'react-router-dom';
//
// import { Header } from '../Header';
// import Navbar from '../Navbar/Navbar';
// // import { ThreadComponent } from '../TreadComponent';
//
// import { ThreadViewPage } from '../ThreadViewPage';
// import { AllThreadsPage } from '../AllThreadsPage';
// import { PersonalCabinetPage } from '../PersonalCabinetPage';
//
// import styles from './Layout.module.scss';
// import { userService } from '../../services/index';
//
// const Feed = () => <p>Feed</p>;
//
// class LoginPage extends React.Component {
// 	loginHandler = () => {
// 		userService
// 			.loginUser()
// 			.then(user => this.props.setUser(user))
// 			.catch(err => console.log(err));
// 	};
//
// 	logOutHandler = () => userService.signOut().then(() => this.props.logOut());
//
// 	render() {
// 		return <button onClick={this.loginHandler}>Kek in</button>;
// 	}
// }
//
// export default function Layout({ isUserLoggedIn, setUser }) {
//   if (!isUserLoggedIn) return <LoginPage setUser={setUser} />;
//   return (
//     <>
//       <Header />
//       <Navbar />
//       <div className={styles.mainWrapper}>
//         <Switch>
//           <Route path="/" exact component={AllThreadsPage} />
//           <Route path="/feed/:id" component={ThreadViewPage} />
//           <Route path="/feed" component={Feed} />
//           <Route path="/cabinet" component={PersonalCabinetPage} />
//         </Switch>
//       </div>
//     </>
//   );
// }
