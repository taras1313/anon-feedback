import React from 'react';

export default function Counter({counter, increaseCounter, decreaseCounter}) {
  return(
    <>
      {counter}
      <button onClick={increaseCounter}>+</button>
      <button onClick={decreaseCounter}>-</button>
    </>
  );
}
