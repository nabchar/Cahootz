import React from 'react';
import { Link } from 'react-router';

export default function SessionHeader({linkPath, linkName}) {

  return (
    <header className="auth-header">
      <h1>CAHOOTZ</h1>
      <Link to={linkPath}>{linkName}</Link>
    </header>);
}
