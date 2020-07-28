import React from 'react';
import ReactDom from 'react-dom';

import { App } from './Components/_App';


window.onload = () => {
  const appdiv = document.getElementById('app');

  ReactDom.render(
    <App />,
    appdiv
  );
};
