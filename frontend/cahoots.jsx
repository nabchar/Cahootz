import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { Root } from './components/root';

//TEST
import {logOut} from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {currentUser: window.currentUser, errors: {}};
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }

  // Todo: Remove from window
  window.store = store;
  window.logOut = logOut;

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={ store }/>, root);
});
