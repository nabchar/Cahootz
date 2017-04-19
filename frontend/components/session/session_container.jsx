import React from 'react';
import SessionFormContainer from './session_form_container';
import SessionHeader from './session_header';

const SessionContainer = ({location}) => {
  let linkPath = (location.pathname === '/signup') ? 'signin' : 'signup';
  let linkName = (linkPath === 'signin') ? 'Sign In' : 'Sign Up'

  return (
    <main>
      <SessionHeader linkName={linkName} linkPath={linkPath}/>
      <SessionFormContainer />
    </main>
  );
};

export default SessionContainer;
