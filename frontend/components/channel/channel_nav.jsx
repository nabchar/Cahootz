import React from 'react';
import { connect } from 'react-redux';
import {withRouter, hashHistory} from 'react-router';
import Modal from 'react-modal';
import { unsubscribeFromChannel,
         subscribeToChannel,
         fetchChannel } from '../../actions/channel_actions';




const mapStateToProps = (state, ownProps) => {
  let currentChannel = state.channels[ownProps.currentChannel];
  if (currentChannel === undefined) {
    currentChannel = state.direct_messages[ownProps.currentChannel];
  }

  return {
    currentChannel,
    subscriptions: state.session.subscriptions,
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {

  return {
    unsubscribe: (id) => dispatch(unsubscribeFromChannel(id)),
    subscribe: (id) => dispatch(subscribeToChannel(id))
  };
};


class ChannelNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };

    this.style = {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        zIndex: 10,
      },
      content: {
        padding: 0,
        position: 'absolute',
        top: 65,
        left: 300,
        width: 250,
        height: 110,
        zIndex: 11,
        borderRadius: 6,
        border: '1px solid rgba(0,0,0,.15)',
        boxShadow: '0 5px 10px rgba(0,0,0,.12)',
      },
    };

    this.handleClick = this.handleClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({showModal: true});
  }

  closeModal() {
    this.setState({showModal: false});
  }

  handleClick(modalAction) {
    return () => {
      let { currentChannel } = this.props;
      modalAction(currentChannel.id)
        .then(() => fetchChannel(currentChannel.id))
        .then(() => this.closeModal());
    };
  }


  render() {
    let { currentChannel,
          subscriptions,
          unsubscribe,
          subscribe,
          currentUser} = this.props;

    let modalContent = 'Leave this chat';
    let modalAction = unsubscribe;
    let header;

    if (currentChannel.name === undefined) {
      let channelName;
      let channelIcon;
      //Handle self, 1-1, and multi person DM setup
      if ((currentChannel.memberCount - 1) === 0) {
        currentChannel.purpose = 'private direct messaging';
        header = (<h2>{`@${currentUser.username}  `}<span>(you)</span></h2>);
      } else if ((currentChannel.memberCount - 1) === 1){
        let member = currentChannel.members.filter(user => user.id !== currentUser.id);
        currentChannel.purpose = 'private direct messaging';
        header = (<h2>{`@${member[0].username}`}</h2>);
      } else {
        return;
      }
    } else {
      header = (<h2># {currentChannel.name}</h2>);
    }

    return (
      <div className='channel-nav'>
        <div className='channel-info'>
          {header}
          <p>
            <i className="fa fa-user-o" aria-hidden="true"></i>
            <span className='member-count'>{currentChannel.memberCount}</span>
            <span className='purpose'> {currentChannel.purpose}</span>
            <i onClick={this.openModal}
               className="fa fa-cog"
               aria-hidden="true"></i>
          </p>
        </div>

        <div className='channel-util'>
        </div>

        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.closeModal}
          style={this.style}
          contentLabel='channelUtil'>

          <section className="channel-nav-dropdown">
            <div>
              <h2># {currentChannel.name}</h2>
            </div>
            <div className='dropdown-action'
                 onClick={this.handleClick(modalAction)}>
              <span>{modalContent}</span>
            </div>
          </section>
        </Modal>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(ChannelNav);
