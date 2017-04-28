import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { signIn } from '../../actions/session_actions';

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInGuest1: () => dispatch(
        signIn({user: {username: 'pinky', password: 'password' }})),
    signInGuest2: () => dispatch(
        signIn({user: {username: 'the_brain', password: 'password' }}))
  };
};

class GuestPage extends React.Component {
  constructor(props) {
    super(props);

    this.loginGuest1 = this.loginGuest1.bind(this);
    this.loginGuest2 = this.loginGuest2.bind(this);
  }

  loginGuest1() {
    this.props.signInGuest1().then((res) => {
        let prevChannelId = res.user.currentUser.previous_channel_id;
        let rootPath = '/messages/' + prevChannelId;
        return hashHistory.push(rootPath);
      });
  }

  loginGuest2() {
    this.props.signInGuest2().then((res) => {
        let prevChannelId = res.user.currentUser.previous_channel_id;
        let rootPath = '/messages/' + prevChannelId;
        return hashHistory.push(rootPath);
      });
  }


  render() {
    return (
      <div className="session-main">
        <header className="session-header">
          <p>
            <Link className="session-logo" to={'/'}>
              <i className="fa fa-slack" aria-hidden="true"></i>
              <strong>cahootz</strong>
            </Link>
          </p>
          <div className='link-container'>
            <p>
              <Link className='session-header-link' to={'/signin'}>Sign in</Link>
            </p>
            <p>
              <Link className='session-header-link' to={'/signup'}>Sign up</Link>
            </p>
          </div>
        </header>

        <section className='session-content'>
          <form className='session-form'>
          <h1 className='align-center guest-h'>Try out Cahootz</h1>
          <p className='align-center guest-sub'>
              Select from one of following personalities.
          </p>
            <section className='session guest-outer'>
              <div onClick={this.loginGuest1}
                   className='guest creden1'>
                Pinky
              </div>
              <div onClick={this.loginGuest2}
                   className='guest creden2'>
                The Brain
              </div>
            </section>
            <p className='align-center guest-post-sub'>or open up both to test out <strong>live chat</strong> and get the full experience.</p>
          </form>
        </section>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuestPage);
