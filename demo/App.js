import React from 'react';
import ReactDOM from 'react-dom';
import useSwipe from '../src/index.js';

const App = () => {
  const swipe = useSwipe()
  console.log("swipe", swipe)
  return <div>hello</div>
}

ReactDOM.render(<App/>, document.querySelector('#root'));
