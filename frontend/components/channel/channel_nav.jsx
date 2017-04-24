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
          <h2># {currentChannel.name}</h2>
          <p>
            <i className="fa fa-user-o" aria-hidden="true"></i>
            <span className='member-count'>{currentChannel.memberCount}</span>
            <span className='purpose'> {currentChannel.purpose}</span>
          </p>
        </div>
        <div className='channel-util'>
          
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(ChannelNav);
