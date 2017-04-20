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
    this.props.logOut().then(() => hashHistory.push('/signin'));
  }

  render(){
    debugger
    let { currentUser } = this.props;
    return (
      <div>
        <div>
          <h1>
            Main Channel!
          </h1>
          <p>
            Welcome {currentUser.username}!
          </p>
        </div>
        <div>
          <button onClick={this.handleClick}>Sign Out</button>
        </div>
      </div>
    );
  }
};


const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(
  mapStateToProps,
  dispatch => ({ logOut: () => dispatch(logOut()) })
)(MainChannel);
