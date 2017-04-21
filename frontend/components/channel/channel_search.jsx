import React from 'react';
import { Link, hashHistory } from 'react-router';


class ChannelSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {query: ""};
  }

  componenDidMount() {
    this.props.fetchAllChannels();
  }

  render() {
    const { channels } = this.props;
    const searchItems = tweets.map(channel => {
      return <ChannelSearchItem key = { channel.id } channel={channel}/>;
    });

    return(
      <div className='browse-main'>
        <header className='browse-header'>
          <div></div>
          <div>
            <Link to={'/main'}>esc</Link>
          </div>
        </header>

        <div className='channel-browse'>
          <div className='channel-browse-title'>
            <h1>Browse all channels</h1>
            <Link to={'/'}></Link>
          </div>
          <div className='search-bar-outer'>
            <div className='browse-filter-outer'>
              Search input
            </div>
            <div className='browse-sort-outer'>
              Sort channels
            </div>
          </div>
          <div className='channel-list-outer'>
            <div className='channel-sub-head'>
              Channels you can join
            </div>
            <div className='channel-list'>
              Channel List
              <div className='channel-list-item'>
                Channel List Item
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

}
