import React from 'react';
import { connnect } from 'react-redux';
import { withRouter } from 'react-router';
import Modal from 'react-modal';
import { hashHistory } from 'react-router';

class UserNav extends React.Component {
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
        top: 60,
        left: 20,
        width: 250,
        height: 125,
        zIndex: 11,
        borderRadius: 6,
        border: '1px solid rgba(0,0,0,.15)',
        boxShadow: '0 5px 10px rgba(0,0,0,.12)',
      },
    };

    this.handleClick = this.handleClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({showModal: true});
  }

  closeModal() {
    this.setState({showModal: false});
  }

  handleClick() {
    this.props.logOut().then(() => {
      return hashHistory.push('/signin');
    });
  }

  render() {
    let {currentUser, logOut} = this.props;
    let userHandle;
    if (currentUser) {
      userHandle = currentUser.username;
    }
    let userAvatar = currentUser.avatar_url;

    return (
      <div className={"user-nav" + (this.state.showModal ? " open" : "")}
           onClick={this.openModal.bind(this)}>
        <div className="nav-header">
          <p>
            <i className="fa fa-slack" aria-hidden="true"></i>
            <span>Cahootz</span>
            <i className="fa fa-angle-down" aria-hidden="true"></i>
          </p>
        </div>
        <div className="username">
          <div className="user-status"></div>
          <span>{ userHandle }</span>
        </div>

        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.closeModal}
          style={this.style}
          contentLabel='userNav'>

          <section className="sidebar-dropdown">
            <div className='user-outer'>
              <div className='avatar-outer'>
                <img src={userAvatar} className='avatar' />
              </div>
              <div className='user-info-outer'>
                <h2>{userHandle}</h2>
                <h3>@{userHandle}</h3>
              </div>
            </div>
            <div className='signout'
              onClick={this.handleClick}>
              <span>SIGN OUT</span>
              <i className="fa fa-sign-out" aria-hidden="true"></i>
            </div>
          </section>
        </Modal>
      </div>
    );
  }
}

export default withRouter(UserNav);
