import React from 'react';
import { connnect } from 'react-redux';
import { withRouter } from 'react-router';

import { logOut } from '../../actions/session_actions';
import { hashHistory } from 'react-router';


const UserNav = ({ currentUser }) => {
  let userHandle;
  if (currentUser) {
    userHandle = currentUser.username;
  }

  return (
    <div className="user-nav">
      <div className="nav-header">
        <p>
          <i className="fa fa-slack" aria-hidden="true"></i>
          <span>Cahootz</span>
        </p>
      </div>
      <div className="username">
        <div className="status"></div>
        <span>{ userHandle }</span>
      </div>
    </div>
  );
};

export default withRouter(UserNav);