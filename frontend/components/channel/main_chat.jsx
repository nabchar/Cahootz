import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import {fetchChannels} from '../../actions/channel_actions';
import { fetchMessages } from '../../actions/message_actions';
import ChannelSidebar from './channel_index_container';
import { logOut } from '../../actions/session_actions';
import ChannelNav from './channel_nav';
import MessageIndex from '../messages/message_index';
import MessageForm from '../messages/message_form';

const mapStateToProps = ( {channels, messages} ) => {
  return {
    channels,
    messages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchChannels: () => dispatch(fetchChannels()),
    fetchMessages: (id) => dispatch(fetchMessages(id)),
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
      .then(() => this.props.fetchMessages(channelId));
  }

  handleClick () {
    this.props.logOut().then(() => {
      return hashHistory.push('/signin');
    });
  }

  render () {
    let { channels, messages } = this.props;
    if (channels.isFetching || messages.isFetching) {
      return (<div>Loading</div>);
    } else {
      let currentChannel = this.props.params.channelId;
      return (
        <div className='channel-main'>
          <ChannelSidebar />
          <div className='messages-main'>
            <header className='messages-header'>
              <ChannelNav
                currentChannel={currentChannel}/>
            </header>
              <MessageIndex currentChannel={currentChannel}/>
              <MessageForm currentChannelId={currentChannel}/>
          </div>
        </div>
      );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainChat);
