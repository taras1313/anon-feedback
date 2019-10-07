import React from 'react';
import './App.css';
import Counter from './components/Counter/Counter';
import { connect } from 'react-redux';
import { increaseCounter, decreaseCounter } from './actions/actions';
import Thread from './components/Thread/Thread';

const thread = {
  title: 'kak bi zalutat"',
  likes: 10,
  dislikes: 10,
  user: { 
    username: 'Tyakimyuk'
  },
  text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  creationDate: new Date()
};

function App(props) {
    return (
      <div className="App">
        <Counter counter={props.counter} increaseCounter={props.actions.increaseCounter} decreaseCounter={props.actions.decreaseCounter} />
        <Thread {...thread} />
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
