/* globals Pusher */
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { allMessages } from '../../reducers/selectors';
import MessageIndexItem from './message_index_item';
import { fetchMessages } from '../../actions/message_actions';

const mapStateToProps = ({ channels, direct_messages, messages, session }, ownProps) => {
  return {
    messages: allMessages(messages),
    channels,
    direct_messages,
    currentUser: session.currentUser
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


    this.instantiatePusher();
  }

  instantiatePusher() {
    let currentChannel = this.props.channels[this.props.currentChannelId];
    if (currentChannel === undefined) {
      currentChannel = this.props.direct_messages[this.props.currentChannelId];
    }

    this.pusher = new Pusher('a9c970bf3597377db826', {
      encrypted: true
    });
    let channel = this.pusher.subscribe('channel_' + currentChannel.id);
    channel.bind('message_published', (data) => {
      this.props.fetchMessages(currentChannel.id);
    });
    channel.bind('message_updated', (data) => {
      this.props.fetchMessages(currentChannel.id);
    });
    channel.bind('message_deleted', (data) => {
      this.props.fetchMessages(currentChannel.id);
    });
  }

  componentWillUpdate() {
    this.instantiatePusher();
  }

  componentDidUpdate() {
      this.scrollToBottom();
  }

  componentWillUnmount() {
    let currentChannel = this.props.channels[this.props.currentChannelId];
    if (currentChannel === undefined) {
      currentChannel = this.props.direct_messages[this.props.currentChannelId];
    }

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

    //Render Messages for Direct Message Channel
    if (this.props.channels[this.props.currentChannelId] === undefined) {
      let { currentUser } = this.props;
      let dm = this.props.direct_messages[this.props.currentChannelId];
      let dmName, content;

      if ((dm.memberCount - 1) === 0) {
        dmName = `@${currentUser.username}`;
        content =  <p><b>This is your space</b>. Draft messages, list you to-dos, plot away. You can also talk to <italic>yourself</italic> here but please bear in mind you'll have to supply both sides of the conversation.</p>;
      }
      else if ((dm.memberCount - 1) === 1){
        let member = dm.members.filter(user => user.id !== currentUser.id);
        dmName = `@${member[0].username}`;
        content =  (<p>This if you direct message history with <span>{member[0].username}.</span></p>);
      }
      else {
          let members = dm.members.filter(user => user.id !== currentUser.id);
          content = 'This is your direct message history with ';
          for (let i = 0; i < members.length - 1; i++) {
            content += `@${members[i].username},  `;
          }
          content += `and @${members[members.length - 1].username}.`;
          dmName = 'Private Group Chat';

      }

      return (
        <div className='message-index-outer'>
          <section className='message-index'>
            <div className='ch-info'>
              <h1>{dmName}</h1>
              <p>{content}</p>
            </div>
            { messageList }
            <div ref={(el) => {this.messagesEnd = el; }}></div>
          </section>
        </div>
      );
    }

    //Render Messages for Regular Channel
    else {
      let { name,
            creator,
            purpose,
            description,
            created_at } = this.props.channels[this.props.currentChannelId];

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
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageIndex);
