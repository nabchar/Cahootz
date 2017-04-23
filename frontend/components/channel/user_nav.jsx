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
        top: 56,
        left: 10,
        width: 270,
        height: 120,
        zIndex: 11,
        borderRadius: 6,
        border: '1px solid rgba(0,0,0,.15)',
        boxShadow: '0 5px 10px rgba(0,0,0,.12)',
      },
    };

    this.handleClick = this.handleClick.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
  }

  openDropdown() {
    this.setState({showModal: true});
  }

  closeDropdown() {
    this.setState({showModal: false});
  }

  handleClick() {
    this.props.logOut()
      .then(() => this.closeDropdown())
      .then(() => hashHistory.push('/signin'));
  }

  render() {
    let {currentUser, logOut} = this.props;
    let userHandle;
    if (currentUser) {
      userHandle = currentUser.username;
    }

    return (
      <div className={"user-nav" + (this.state.showModal ? " open" : "")}
           onClick={this.openDropdown.bind(this)}>
        <div className="nav-header">
          <p>
            <i className="fa fa-slack" aria-hidden="true"></i>
            <span>Cahootz</span>
          </p>
        </div>
        <div className="username">
          <div className="status"></div>
          <span>{ userHandle }</span>
        </div>

        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.closeDropdown}
          style={this.style}>
          <section className="sidebar-dropdown">
            <h2>{userHandle}</h2>
            <h3>@{userHandle}</h3>
            <div>
              <button onClick={this.handleClick}>Sign out</button>
            </div>
          </section>
        </Modal>

      </div>
    );
  }
}

export default withRouter(UserNav);
