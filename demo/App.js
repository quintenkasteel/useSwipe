import React from 'react';
import ReactDOM from 'react-dom';
import useSwipe from '../src/index.js';
import Slider from './Slider/Slider.js';

const App = () => {
  return <Slider><div></div> <div></div><div></div><div></div><div></div></Slider> 
}

ReactDOM.render(<App/>, document.querySelector('#root'));
