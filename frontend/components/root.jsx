import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import SessionContainer from './session/session_container';
import MainChannel from './channel/main_channel_container';
import Splash from './splash/splash';

export const Root = ({ store }) => {

  function _redirectIfLoggedIn(nextState, replace) {
    const loggedIn = Boolean(store.getState().currentUser.id);
    if (loggedIn) {
      replace('/main');
    }
  }

  function _redirectIfLoggedOut(nextState, replace) {
    const loggedOut = Boolean(store.getState().currentUser.id);
    if (!loggedOut) {
      replace('/')
    }
  }

  return(
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path='/' component={ App }>
          <IndexRoute component={ Splash }
                      onEnter={_redirectIfLoggedIn} />
          <Route path='/signin'
                 component={ SessionContainer }
                 onEnter={_redirectIfLoggedIn} />
          <Route path='/signup'
                 component={ SessionContainer }
                 onEnter={_redirectIfLoggedIn} />
               <Route path='/main' component={ MainChannel } onEnter={_redirectIfLoggedOut}/>
        </Route>
      </Router>
    </Provider>);
}
