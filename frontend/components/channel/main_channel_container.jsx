import React from 'react'
import { logOut } from '../../actions/session_actions';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';


class MainChannel extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    debugger
    this.props.logOut()//.then(() => hashHistory.push('/signin'));
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

export default connect(
  null,
  dispatch => ({ logOut: () => dispatch(logOut()) })
)(MainChannel);
