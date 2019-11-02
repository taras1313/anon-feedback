import React from 'react';
import { connect } from 'react-redux';

import Counter from './components/Counter/Counter';
import { increaseCounter, decreaseCounter } from './actions/actions';
import { ThreadComponent } from './components/TreadComponent';

import './App.scss';

function App(props) {
    return (
      <div className="App">
        <ThreadComponent treadView="full"/>
        <hr />
        <ThreadComponent/>
        <ThreadComponent/>
        <ThreadComponent/>
        <Counter counter={props.counter} increaseCounter={props.actions.increaseCounter} decreaseCounter={props.actions.decreaseCounter} />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
