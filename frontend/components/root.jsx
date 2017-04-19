import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import SessionContainer from './session/session_container';
import MainChannel from './channel/main_channel_container';

export const Root = ({ store }) => (

  // function _redirectIfLoggedIn(nextState, replace) {
  //   const loggedIn = store.getState().session.currentUser
  // };
  //  onEnter={_redirectIfLoggedIn}

  <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/" component={ App }>
        <IndexRoute component={ MainChannel }/>
        <Route path="/signin" component={ SessionContainer } />
        <Route path="/signup" component={ SessionContainer }/>
      </Route>
    </Router>
  </Provider>
);
