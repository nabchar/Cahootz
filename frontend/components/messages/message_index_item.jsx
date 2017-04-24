import React from 'react';
import { connect } from 'react-redux';

class MessageIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {message} = this.props;

    let timestamp = new Date(message.created_at);
    let currentTime = new Date;
    if (timestamp.getDay() < currentTime.getDay()) {
      timestamp = timestamp.toLocaleString();
    } else {
      timestamp = timestamp.toLocaleTimeString();
    }

    return (
    <div className='message-index-item'>
      <div className='avatar-outer'>
        <img className='avatar'></img>
      </div>
      <div className='message-content'>
        <p>
          <span>{message.author.username}</span>
          <span>{timestamp}</span>
          <p>{message.content}</p>
        </p>
      </div>

    </div>
    );
  }
}

export default MessageIndexItem;
