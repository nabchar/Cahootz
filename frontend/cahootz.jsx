import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { Root } from './components/root';

//TEST
import {logOut} from './actions/session_actions';
import * as ChannelApiUtil from './util/channel_api_util';
import { createChannel } from './actions/channel_actions';
import * as MessageApiUtil from './util/message_api_util';
import * as MessageActions from './actions/message_actions';

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
  window.MessageApiUtil = MessageApiUtil;
  window.createChannel = createChannel;
  window.MessageActions = MessageActions;

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={ store }
                        currentUser={window.currentUser}/>, root);
});