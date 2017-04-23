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

  return(
    <li onClick={handleSubscribe} className={"channel-search-item "}>
      <h3 className="channel-search-name">{channel.name}</h3>
      <span className="channel-search-info">
        Created by <b>{channel.creator.currentUser.username}</b> on {timestamp}
      </span>
      <span>members:{channel.memberCount}</span>
    </li>
  );
};

export default ChannelSearchItem;
