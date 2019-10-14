import React from 'react';

import Layout from './components/Layout/Layout';

import { connect } from 'react-redux';
import { increaseCounter, decreaseCounter } from './actions/actions';

import './App.css';


import './App.css';
function App(props) {
    return (
      <div className="App">
        <Layout />
      </div>
    );

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
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
