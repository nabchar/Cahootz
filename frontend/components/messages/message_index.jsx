/* globals Pusher */
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { allMessages } from '../../reducers/selectors';
import MessageIndexItem from './message_index_item';
import { fetchMessages } from '../../actions/message_actions';

const mapStateToProps = ({ channels, messages }) => {
  return {
    messages: allMessages(messages),
    channels
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMessages: (channelId) => dispatch(fetchMessages(channelId))
  };
};

class MessageIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.scrollToBottom();
    let currentChannel = this.props.channels[this.props.currentChannel];

    this.pusher = new Pusher('a9c970bf3597377db826', {
      encrypted: true
    });

    let channel = this.pusher.subscribe('channel_' + currentChannel.id);
    channel.bind('message_published', (data) => {
      this.props.fetchMessages(currentChannel.id);
    });
  }

  componentDidUpdate() {
      this.scrollToBottom();
  }

  componentWillUnmount() {
    let currentChannel = this.props.channels[this.props.currentChannel];
    this.pusher.unsubscribe('channel_' + currentChannel.id);
  }

  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({behavior: "smooth"});
  }

  render () {
    let messageList = this.props.messages.map(message => {
      return (<MessageIndexItem key={message.id}
                                message={message} />);
    });
    let { name,
          creator,
          purpose,
          description,
          created_at } = this.props.channels[this.props.currentChannel];

    let timestamp = new Date(created_at);
    timestamp = timestamp.toLocaleDateString();

    return (
      <div className='message-index-outer'>
        <section className='message-index'>
          <div className='ch-info'>
            <h1>#{name}</h1>
            <p>
              <span>{creator.username}</span> created this channel on {timestamp}
            </p>
            <p>Purpose: {purpose}</p>
          </div>
          { messageList }
          <div ref={(el) => {this.messagesEnd = el; }}></div>
        </section>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageIndex);
