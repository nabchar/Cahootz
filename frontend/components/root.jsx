import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import SessionFormContainer from './session/session_form_container';
import MainChat from './channel/main_chat';
import Splash from './splash/splash';
import ChannelIndexContainer from './channel/channel_index_container';

export const Root = ({ store }) => {

  function _redirectIfLoggedIn(nextState, replace) {
    const loggedIn = Boolean(store.getState().session.currentUser);
    if (loggedIn) {
      replace('/messages/3');
    }
  }

  function _redirectIfLoggedOut(nextState, replace) {
    const loggedOut = Boolean(store.getState().session.currentUser);
    if (!loggedOut) {
      replace('/');
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
          <Route path='/messages/:channelId'
                 component={ MainChat }
                 onEnter={_redirectIfLoggedOut} />
        </Route>
      </Router>
    </Provider>);
};
