import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from './redux/store/configureStore';
import {Provider} from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
