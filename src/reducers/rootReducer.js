import { INCREMENT, DECREMENT } from '../types/actionTypes';
import { combineReducers } from 'redux';

const initialState = {
  counter: 0,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {...state, counter: state.counter + 1};

    case DECREMENT:
      return {...state, counter: state.counter - 1};
  
    default:
      return state
  }
} 

export default combineReducers({ appReducer })
