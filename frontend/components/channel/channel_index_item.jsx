import React from 'react';


export default function ChannelIndexItem ( {channel} ) {
  if (channel) {
    let {name, id} = channel;
    return (
      <li key={id} className='list-item'>
        { name }
      </li>
    );
  } else {
    return ;
  }
}
