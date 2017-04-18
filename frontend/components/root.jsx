import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import SessionFormContainer from './session/session_form_container';

export const Root = ({ store }) => (

  // function _redirectIfLoggedIn(nextState, replace) {
  //   const loggedIn = store.getState().session.currentUser
  // };
  //  onEnter={_redirectIfLoggedIn}

  <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/" component={ App } />
        <Route path="/" component={ App }>
          <Route path="/login" component={ SessionFormContainer } />
          <Route path="/signup" component={ SessionFormContainer }/>
        </Route>
    </Router>
  </Provider>
);
