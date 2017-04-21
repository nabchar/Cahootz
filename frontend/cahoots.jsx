import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { Root } from './components/root';

//TEST
import {logOut} from './actions/session_actions';
import * as ChannelApiUtil from './util/channel_api_util';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {session: window.currentUser , errors: {} };
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }

  // Todo: Remove from window
  window.store = store;
  window.logOut = logOut;
  window.ChannelApiUtil = ChannelApiUtil;

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={ store }/>, root);
});
