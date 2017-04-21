import React from 'react'
import { logOut } from '../../actions/session_actions';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import {fetchAllChannels} from '../../actions/channel_actions';
import ChannelIndexContainer from './channel_index_container'


class MainChannel extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.props.fetchAllChannels();
    debugger
  }

  handleClick() {
    this.props.logOut().then(() => hashHistory.push('/signin'));
  }

  render(){
    // debugger
    let { channelId } = this.props.params

    return (
      <div className='channel-main'>
        <div className='channel-index-outer'>
          <div className='user-nav'>
            <div>
              <p>Cahootz</p>
              <p>Welcome!</p>
              <button onClick={this.handleClick}>Sign Out</button>
            </div>
          </div>

      

        </div>

        <div className='current-channel'>
          <header className='messages-header'>
            <div className='channel-nav'>
              <div className='channel-info'>Channel Info</div>
              <div className='channel-util'>Channel Util</div>
            </div>
          </header>

          <div className='message-outer'>
            <section className='messages-container'>
              Messages Index Container
              <div>message</div>
              <div>message</div>
            </section>
          </div>

          <footer className='message-input-outer'>
            <div className='message-input-inner'>
              Message Input
            </div>
          </footer>
        </div>

      </div>
    );
  }
};


const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
    fetchAllChannels: () => dispatch(fetchAllChannels())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainChannel);
