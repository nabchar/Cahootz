import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import {fetchChannels} from '../../actions/channel_actions';
import ChannelSidebar from './channel_index_container';
import { logOut } from '../../actions/session_actions';

const mapStateToProps = ( {channels} ) => {
  return {
    channels
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchChannels: () => dispatch(fetchChannels()),
    logOut: () => dispatch(logOut())
  };
};

class MainChat extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount () {
    this.props.fetchChannels();
  }

  handleClick () {
    this.props.logOut().then(() => {
      return hashHistory.push('/signin');
    });
  }

  render () {
    if (this.props.channels.isFetching) {
      return (<div>Loading</div>);
    } else {
      return (
        <div className='channel-main'>
          <ChannelSidebar />
          <div>Fetched
              <button onClick={this.handleClick}>Sign Out</button>
          </div>
        </div>
      );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainChat);
