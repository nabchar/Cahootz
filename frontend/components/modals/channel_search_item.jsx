import React from 'react';
import { hashHistory } from 'react-router';

const ChannelSearchItem = ({ channel, subscribeToChannel, closeModal, subscribedChannels }) => {

  const handleSubscribe = () => {
    let url = '/messages/' + channel.id;

    for (let i = 0; i < subscribedChannels.length; i++) {
      if (subscribedChannels[i].id === channel.id) {
        hashHistory.push(url);
        closeModal();
        return;
      }
    }

    return subscribeToChannel(channel.id)
      .then(() => closeModal())
      .then(() => hashHistory.push(url));
  };

  let timestamp = new Date(channel.created_at);
  timestamp = timestamp.toLocaleDateString();
  debugger

  return(
    <li onClick={handleSubscribe} className={"channel-search-item "}>
      <div className="channel-search-header">
        <h3 className="channel-search-name">#
          {channel.name}
        </h3>
        <div className='member-count'>
          <i className="fa fa-user-o" aria-hidden="true"></i>
          <span>{channel.memberCount}</span>
        </div>
        <div className='hover-message'>
          <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          <p>
            Join or Open
          </p>
        </div>
      </div>
      <span className="channel-search-info">
        Created by <b>{channel.creator.currentUser.username}</b> on {timestamp}
      </span>
      <p className='channel-purpose'>{channel.purpose}</p>
    </li>
  );
};

export default ChannelSearchItem;
