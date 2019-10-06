import React from 'react';
import './App.css';
import Counter from './components/Counter/Counter';
import { connect } from 'react-redux';
import { increaseCounter, decreaseCounter } from './actions/actions';

function App(props) {
    return (
      <div className="App">
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
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
