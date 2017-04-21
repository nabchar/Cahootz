import React from 'react';


export default function ChannelIndexItem ( {channel} ) {
  if (channel) {
    let {channelName, id} = channel;
    return (
      <li key={id} className='list-item'>
        { channelName }
      </li>
    );
  } else {
    return
  }
}
