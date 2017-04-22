import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import { logOut } from '../../actions/session_actions';
import { hashHistory } from 'react-router';
import UserNav from './user_nav';
import ChannelList from './channel_list';

const mapStateToProps = ({session, channels}) => {
  // channels user is subscribed
  const userChannels = session.subscriptions.map( sub => channels[sub.id]);

  return {
    session,
    channels,
    userChannels
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut())
  };
};


class ChannelIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.props.logOut().then(() => hashHistory.push('/signin'));
  }

  render () {
    let { currentUser } = this.props.session;
    let { userChannels } = this.props;

    return (
      <div className='channel-index-outer'>
        <UserNav currentUser={currentUser}/>
        <ChannelList userChannels={userChannels}/>
      </div>
    );
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelIndex);
