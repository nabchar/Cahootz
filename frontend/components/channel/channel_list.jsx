import React, { Component } from 'react';
import { Link, withRouter, hashHistory } from 'react-router';


const ChannelList = (props) => {
  let { userChannels, openChannelForm, openChannelSearch } = props;
  let { channelId } = props.params;

  const userChannelList = userChannels.map(channel => {
      let channelType = (channel.id === parseInt(channelId)) ?
                        'current' : 'non-current';
      const handleClick = () => {
        let url = '/messages/' + channel.id;
        return () => hashHistory.push(url);
      };

      return (
        <li onClick={handleClick()} className={channelType}
            key={ channel.id }>
            <p><i># <span>{ channel.name }</span></i></p>
        </li>
      );
    });

  return (
    <aside className='channel-index'>
      <div className='channel-list-outer'>
        <p className='list-header'>
          <span onClick={openChannelSearch}>Channels</span>
          <i className="fa fa-plus-circle add-channel"
             aria-hidden="true"
             onClick={openChannelForm}></i>
        </p>

        <ul className='channel-list'>
          {userChannelList}
        </ul>
      </div>

      <div className='dm-list-outer'>
        <p className='dm-header'>
          Direct Messages
          <i aria-hidden="true"></i>
        </p>

        <ul className='dm-list'>
          <li className='list-item'>
            <p><i><div className='status'></div><span>nabchar (you)</span></i></p>
          </li>
          <li className='list-item'>
            <p><i><div className='status'></div><span>rona</span></i></p>
          </li>
          <li className='list-item'>
            <p><i><div className='status'></div><span>mbones</span></i></p>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default withRouter(ChannelList);
