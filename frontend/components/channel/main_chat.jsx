import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { fetchChannels,
         fetchDirectMessages } from '../../actions/channel_actions';
import { fetchMessages } from '../../actions/message_actions';
import { fetchUsers, logOut } from '../../actions/session_actions';

import ChannelSidebar from './channel_sidebar';
import ChannelNav from './channel_nav';
import MessageIndex from '../messages/message_index';
import MessageForm from '../messages/message_form';

const mapStateToProps = ( {users, channels, messages, direct_messages, session} ) => {
  return {
    channels,
    messages,
    users,
    direct_messages,
    session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchChannels: () => dispatch(fetchChannels()),
    fetchMessages: (id) => dispatch(fetchMessages(id)),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchDirectMessages: () => dispatch(fetchDirectMessages()),
    logOut: () => dispatch(logOut())
  };
};

class MainChat extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount () {
    let { channelId } = this.props.params;
    channelId = parseInt(channelId);

    this.props.fetchChannels()
      .then(() => this.props.fetchDirectMessages())
      .then(() => this.props.fetchMessages(channelId))
      .then(() => this.props.fetchUsers());
  }

  handleClick () {
    this.props.logOut().then(() => {
      return hashHistory.push('/signin');
    });
  }

  render () {
    let { channels, messages, users, direct_messages, session } = this.props;
    if ( channels.isFetching || messages.isFetching ||
         users.isFetching || direct_messages.isFetching ) {
      return (<div>Loading</div>);
    } else if (session.currentUser) {
      let currentChannel = this.props.params.channelId;
      return (
        <div className='channel-main'>
          <ChannelSidebar />
          <div className='messages-main'>
            <header className='messages-header'>
              <ChannelNav
                currentChannel={parseInt(currentChannel)}/>
            </header>
            <MessageIndex currentChannelId={parseInt(currentChannel)}/>
            <MessageForm currentChannelId={currentChannel}/>
          </div>
        </div>
      );
    } else {
      return (
        <div>Goodbye</div>
      );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainChat);
