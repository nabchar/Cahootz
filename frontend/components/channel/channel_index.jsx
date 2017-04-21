import React from 'react';
import ChannelIndexItem from './channel_index_item';

class ChannelIndex extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    //fetch user subscribed channels
  }


  render () {
    let {currentChannel, numChannels} = this.props;

    debugger

    return (
      <aside className='channel-index'>
        Channel Nav
        <div className='channel-list-outer'>
          <p>Channels </p>
          <ul className='channel-list'>
            //   this.props.channels.map(
            //
            //     //stuff
            //   )
          </ul>
        </div>

        <div className='dm-list-outer'>
          <p>Direct Messages</p>
          <ul className='dm-list'>
            <li className='list-item'>dm 1</li>
            <li className='list-item'>dm 2</li>
            <li className='list-item'>dm 3</li>
          </ul>
        </div>
      </aside>
    );
  }
};

export default ChannelIndex;
