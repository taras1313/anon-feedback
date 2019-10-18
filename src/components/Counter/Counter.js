import React from 'react';
import { userService } from '../../services';

userService.getCurrentUser({ id: '123' });
export default function Counter({ counter, increaseCounter, decreaseCounter }) {
  return (
    <>
      {counter}
      <button onClick={increaseCounter}>+</button>
      <button onClick={decreaseCounter}>-</button>
    </>
  );
}
