import React from 'react'
import { logOut } from '../../actions/session_actions';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';


class MainChannel extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.logOut().then(() => hashHistory.push('/signin'));
  }

  render(){
    let { currentUser } = this.props;
    return (
      <div className='channel-main'>

        <header className='header-main'>
          <div className='user-nav'>
            <p>Welcome {currentUser.username}!</p>
            <button onClick={this.handleClick}>Sign Out</button>
          </div>

          <div className='channel-nav'>
            <div className='channel-info'>Channel Info</div>
            <div className='channel-util'>Channel Util</div>
          </div>
        </header>

        <section className='main-section'>
          <aside className='channel-nav'>Channel Nav</aside>
          <section className='message-outer'>
            <section className='messages-container'>
              Messages Index Container
            </section>
            <div className='message-input-outer'>
              Message Input
            </div>
          </section>
        </section>

      </div>
    );
  }
};


const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(
  mapStateToProps,
  dispatch => ({ logOut: () => dispatch(logOut()) })
)(MainChannel);
