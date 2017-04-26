import React from 'react';
import { hashHistory } from 'react-router';

const ChannelSearchItem = ({ channel,
                             subscribeToChannel,
                             closeModal,
                             subscribedChannels,
                             fetchMessages }) => {

  const handleSubscribe = () => {
    let url = '/messages/' + channel.id;

    for (let i = 0; i < subscribedChannels.length; i++) {
      if (subscribedChannels[i].id === channel.id) {
        fetchMessages(channel.id)
          .then(() => hashHistory.push(url))
          .then(() => closeModal());
        return;
      }
    }

    return subscribeToChannel(channel.id)
      .then(() => fetchMessages(channel.id))
      .then(() => hashHistory.push(url))
      .then(() => closeModal());
  };

  let timestamp = new Date(channel.created_at);
  timestamp = timestamp.toLocaleDateString();

  // Setup hover-message
  let hoverMessage;
  for (let i = 0; i < subscribedChannels.length; i++) {
    if (subscribedChannels[i].id === channel.id) {
      hoverMessage = 'Open Channel';
      break;
    }
    hoverMessage = 'Join Channel';
  }


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
          <p>
            {hoverMessage}
          </p>
          <span>
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </span>
        </div>
      </div>
      <span className="channel-search-info">
        Created by <b>{channel.creator.username}</b> on {timestamp}
      </span>
      <p className='channel-purpose'>{channel.purpose}</p>
    </li>
  );
};

export default ChannelSearchItem;
