import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { Root } from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  const root = document.getElementById('root');

  // Todo: Remove from window
  window.store = store;

  ReactDOM.render(<Root store={ store }/>, root);
});
