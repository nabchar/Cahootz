import React from 'react'
import { logOut } from '../../util/session_api_util';
import { hashHistory } from 'react-router'

class MainChannel extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    logOut().then(() => hashHistory.push('/signin'));
  }

  render(){
    return (
      <div>
        Main Channel! Hatch your next plan
        <button onClick={this.handleClick}>Sign Out</button>
      </div>
    );
  }
};

export default MainChannel;
