import React, { Component } from 'react';
import { Link, withRouter, hashHistory } from 'react-router';


const ChannelList = (props) => {
  let { userChannels,
        openChannelForm,
        openChannelSearch,
        openDMForm,
        currentUser,
        fetchMessages,
        channels,
        directMessages
        } = props;
  let { channelId } = props.params;

  const userChannelList = userChannels.map(channel => {
      let channelType = (channel.id === parseInt(channelId)) ?
                        'current' : 'non-current';
      const handleClick = () => {
        let url = '/messages/' + channel.id;
        return () => fetchMessages(channel.id)
                      .then(() => hashHistory.push(url));
      };

      return (
        <li onClick={handleClick()} className={channelType}
            key={ channel.id }>
            <p><i># <span>{ channel.name }</span></i></p>
        </li>
      );
    });

  let totalNumChannels = channels.length;

  const userDMList = directMessages.map(dm => {
    let channelType = (dm.id === parseInt(channelId)) ?
                      'current' : 'non-current';
    const handleClick = () => {
      let url = '/messages/' + dm.id;
      return () => fetchMessages(dm.id)
                    .then(() => hashHistory.push(url));
    };

    let dmName;
    let dmIcon;
    //Handle self, 1-1, and multi person DM setup
    if ((dm.memberCount - 1) === 0) {
      dmName = `${currentUser.username} (you)`;
      dmIcon =  (<span className='user-status' />);
    } else if ((dm.memberCount - 1) === 1){
      let member = dm.members.filter(user => user.id !== currentUser.id);
      dmName = `${member[0].username}`;
      dmIcon =  (<span className='status' />);
    } else {
      let members = dm.members.filter(user => user.id !== currentUser.id);
      dmName = `${members[0].username}, ${members[1].username}...`;
      dmIcon = (<span className='multi-dm'>{dm.memberCount - 1}</span>);
    }

    return (
      <li className={'list-item ' + channelType}
          onClick={handleClick()}
          key={ dm.id }>
          <p>
            <span className='icon-outer'>{dmIcon}</span>
            <span>{dmName}</span>
          </p>
      </li>
    );
  });

  return (
    <aside className='channel-index'>
      <div className='channel-list-outer'>
        <p className='list-header'>
          <span onClick={openChannelSearch}>Channels ({totalNumChannels})</span>
          <span><i className="fa fa-plus-circle add-channel"
             aria-hidden="true"
             onClick={openChannelForm}></i>
          </span>
        </p>

        <ul className='channel-list'>
          {userChannelList}
        </ul>
      </div>

      <div className='dm-list-outer'>
        <p className='dm-header'>
          <span>Direct Messages</span>
          <span onClick={openDMForm}><i className="fa fa-plus-circle add-dm"
             aria-hidden="true"></i></span>
        </p>

        <ul className='dm-list'>
          {userDMList}
        </ul>
      </div>
    </aside>
  );
};

export default withRouter(ChannelList);
