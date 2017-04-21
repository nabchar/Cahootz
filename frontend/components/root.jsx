import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import SessionFormContainer from './session/session_form_container';
import MainChannel from './channel/main_channel_container';
import Splash from './splash/splash';

export const Root = ({ store }) => {

  function _redirectIfLoggedIn(nextState, replace) {
    debugger
    const loggedIn = Boolean(store.getState().currentUser.id);
    if (loggedIn) {
      replace('/messages');
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
                 component={ SessionFormContainer }
                 onEnter={_redirectIfLoggedIn} />
          <Route path='/signup'
                 component={ SessionFormContainer }
                 onEnter={_redirectIfLoggedIn} />
          <Route path='/messages'
                 component={ MainChannel }
                 onEnter={_redirectIfLoggedOut}>
            <Route path=':channelId'
                   component={ MainChannel}
                   onEnter={_redirectIfLoggedOut}/>
          </Route>
        </Route>
      </Router>
    </Provider>);
}
