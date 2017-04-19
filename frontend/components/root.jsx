import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import SessionContainer from './session/session_container';
import MainChannel from './channel/main_channel_container';
import Splash from './splash/splash';

export const Root = ({ store }) => {

  function _redirectIfLoggedIn(nextState, replace) {
    const loggedIn = store.getState().currentUser;
    debugger
    if (loggedIn) {
      replace('/main');
    }
  }

  return(
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path='/' component={ App }>
          <IndexRoute component={ Splash }/>
          <Route path='/signin'
                 component={ SessionContainer }
                 onEnter={_redirectIfLoggedIn} />
          <Route path='/signup'
                 component={ SessionContainer }
                 onEnter={_redirectIfLoggedIn} />
          <Route path='/main' component={ MainChannel } />
        </Route>
      </Router>
    </Provider>);
}
