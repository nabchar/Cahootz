/* globals Pusher */
import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { fetchChannels,
         fetchDirectMessages,
         fetchChannel,
         fetchDirectMessage} from '../../actions/channel_actions';
import { fetchMessages } from '../../actions/message_actions';
import { fetchUsers, logOut } from '../../actions/session_actions';

import ChannelSidebar from './channel_sidebar';
import ChannelNav from './channel_nav';
import MessageIndex from '../messages/message_index';
import MessageForm from '../messages/message_form';
import LoadingPage from '../shared/loading_page';

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
    fetchDirectMessage: (id) => dispatch(fetchDirectMessage(id)),
    logOut: () => dispatch(logOut()),
    fetchChannel: (id) => dispatch(fetchChannel(id))
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

    this.pusher = new Pusher('a9c970bf3597377db826', {
      encrypted: true
    });

    let channels = this.pusher.subscribe('channels');
    channels.bind('channel_created', (data) => {
      this.props.fetchChannels();
    });
    channels.bind('channel_updated', (data) => {
      this.props.fetchChannel(data.id);
    });
    channels.bind('channel_deleted', (data) => {
      this.props.fetchChannels();
    });

    let userId = this.props.session.currentUser.id;
    let dm = this.pusher.subscribe(`dm_${userId}`);
    dm.bind('dm_created', (data) => {
      this.props.fetchDirectMessage(data.id);
    });


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
      return (<LoadingPage />);
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
