import React from 'react';

import { connect } from 'react-redux';
import { increaseCounter, decreaseCounter } from './actions/actions';

import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import AppRouter from './components/AppRouter/AppRouter';

import './App.css';
function App(props) {
    return (
      <div className="App">
        <Header />
        <Navbar />
        <AppRouter />
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
