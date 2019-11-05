import React, { Component } from 'react';
import axios from 'axios';

import Layout from './components/Layout/Layout';

import { connect } from 'react-redux';
import { increaseCounter, decreaseCounter } from './actions/actions';

import './App.css';


import './App.css';

class App extends Component {
  state = {
    loggedIn: false
  };

  componentDidMount() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: '232822822071-1q970aukj04j6cv7p5buinsqs5vn0ks2'
      }).then(console.log)
    })
  }

  loginHandler = () => {
    const GoogleAuth = window.gapi.auth2.getAuthInstance();

    // GoogleAuth.signIn().then(console.log);
    GoogleAuth.signIn().then((data) => {
      this.setState({ loggedIn: true });
      console.log(data.getAuthResponse().id_token);
      axios.post('http://localhost:5000/', {token: data.getAuthResponse().id_token})

    });
  };

  logOutHandler = () => {
    const GoogleAuth = window.gapi.auth2.getAuthInstance();

    // GoogleAuth.signIn().then(console.log);
    GoogleAuth.signOut().then(() => this.setState({ loggedIn: false }));
  };

  render() {
    const { loggedIn } = this.state;

    return (
      <div className="App">
        {!loggedIn && <button onClick={this.loginHandler}>Kek in</button>}
        {loggedIn && <button onClick={this.logOutHandler}>Kek Out</button>}
        <Layout />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    counter: state.appReducer.counter
  }
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      increaseCounter: () => dispatch(increaseCounter()),
      decreaseCounter: () => dispatch(decreaseCounter())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
