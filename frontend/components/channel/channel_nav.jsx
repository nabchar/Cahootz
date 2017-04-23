import React from 'react';
import { connect } from 'react-redux';
import {withRouter, hashHistory} from 'react-router';
import Modal from 'react-modal';



const mapStateToProps = (state, ownProps) => {
  let currentChannel = state.channels[ownProps.currentChannel];
  return {
    currentChannel
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};


class ChannelNav extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    let {currentChannel} = this.props;
    return (
      <div className='channel-nav'>
        <div className='channel-info'>
          <h2>{currentChannel.name}</h2>
          <p>
            <i class="fa fa-user" aria-hidden="true"></i>
            <span>{currentChannel.memberCount}</span>
            <span>Purpose: {currentChannel.purpose}</span>
          </p>
        </div>
        <div className='channel-util'>
          <div className='util-icon'><i class="fa fa-cog" aria-hidden="true"></i></div>
          <div className='util-icon'><i class="fa fa-info" aria-hidden="true"></i></div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(ChannelNav);
