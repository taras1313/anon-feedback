import { INCREMENT, DECREMENT } from '../types/actionTypes';

export const increaseCounter = () => ({type: INCREMENT});
export const decreaseCounter = () => ({type: DECREMENT});
