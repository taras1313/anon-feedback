import React from 'react';
import './App.css';
import Counter from './components/Counter/Counter';
import { connect } from 'react-redux';
import { increaseCounter, decreaseCounter } from './actions/actions';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';

function App(props) {
    return (
      <div className="App">
        <Header />
        <Navbar />
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
