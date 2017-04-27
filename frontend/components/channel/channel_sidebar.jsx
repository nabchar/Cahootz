import React from 'react';
import { connect } from 'react-redux';
import {withRouter, hashHistory} from 'react-router';
import { logOut } from '../../actions/session_actions';
import Modal from 'react-modal';
import { allChannels } from '../../reducers/selectors';
import {  createChannel, subscribeToChannel, fetchChannel } from '../../actions/channel_actions';
import { fetchMessages } from '../../actions/message_actions';

import DMForm from '../direct_messages/dm_form';
import UserNav from './user_nav';
import ChannelList from './channel_list';
import ChannelForm from '../modals/channel_form';
import ChannelSearch from '../modals/channel_search';

const mapStateToProps = ({session, users, errors, channels, direct_messages}) => {
  // channels user is subscribed
  let userChannels = session.subscriptions.map( sub => channels[sub.id]);
  userChannels = userChannels.filter(channel => channel !== undefined);

  return {
    session,
    channels: Object.values(channels),
    users,
    userChannels,
    errors,
    directMessages: Object.values(direct_messages)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
    createChannel: (channel) => dispatch(createChannel(channel)),
    subscribeToChannel: (channelId) => dispatch(subscribeToChannel(channelId)),
    fetchChannel: (id) => dispatch(fetchChannel(id)),
    fetchMessages: (channelId) => dispatch(fetchMessages(channelId))
  };
};


class ChannelSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      modalContent: <div></div>
    };

    this.modalStyle = {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FFF',
        zIndex: 10
      },
      content: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100vh',
        padding: '20px',
        zIndex: 11
      },
    };

    this.closeModal = this.closeModal.bind(this);
    this.openChannelForm = this.openChannelForm.bind(this);
    this.openChannelSearch = this.openChannelSearch.bind(this);
    this.openDMForm = this.openDMForm.bind(this);
    this.handleClick = this.handleClick.bind(this); // to remove
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  componentWillMount() {
    Modal.setAppElement('body');
 }

  openChannelForm() {
    this.setState({
      showModal: true,
      modalContent: (
        <ChannelForm closeModal={this.closeModal}/>
      ),
    });
  }

  openChannelSearch() {
    this.setState({
      showModal: true,
      modalContent: (
        <ChannelSearch
          subscribedChannels={this.props.session.subscriptions}
          allChannels={this.props.channels}
          subscribeToChannel={this.props.subscribeToChannel}
          closeModal={this.closeModal}
          fetchMessages={this.props.fetchMessages}/>
      ),
    });
  }

  openDMForm() {
    this.setState({
      showModal: true,
      modalContent: (
        <DMForm closeModal={this.closeModal}/>
      ),
    });
  }

  handleClick () {
    this.props.logOut().then(() => hashHistory.push('/signin'));
  }

  render () {
    let { currentUser } = this.props.session;
    let { userChannels } = this.props;

    return (
      <div className='channel-index-outer'>
        <UserNav currentUser={currentUser}
                 logOut={this.props.logOut}/>
        <ChannelList userChannels={userChannels}
                     openChannelForm={this.openChannelForm}
                     openChannelSearch={this.openChannelSearch}
                     openDMForm={this.openDMForm}
                     currentUser={currentUser}
                     fetchMessages={this.props.fetchMessages}
                     channels={this.props.channels}
                     directMessages={this.props.directMessages}/>


        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.closeModal}
          style={this.modalStyle}
          contentLabel='channelModal'>

          {this.state.modalContent}
          <button
            className="modal-close"
            onClick={this.closeModal}>
            <span className="modal-close-icon">✕</span>
            <span className="modal-close-text">esc</span>
          </button>
        </Modal>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelSidebar);
