import React from 'react'
import type { counterProps } from '../App'


export default function Counter({count, increment, decrement, reset}: counterProps) {
  return (
    <div>
        <h3>Counter</h3>
        <h1>Current Count:<span>{count}</span></h1>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>  
        <button  
         style={{ 
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: 'red',
          }}
        onClick={reset}>Reset</button>
    </div>
  )
}
