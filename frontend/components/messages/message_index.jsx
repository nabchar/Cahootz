import React from 'react';
import { connect } from 'react-redux';
import { allMessages } from '../../reducers/selectors';
import MessageIndexItem from './message_index_item';

const mapStateToProps = ({ channels, messages }) => {
  return {
    messages: allMessages(messages),
    channels
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//
//   };
// };

class MessageIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
        </section>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(MessageIndex);
