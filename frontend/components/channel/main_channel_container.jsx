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
        <div className='channel-index-outer'>
          <div className='user-nav'>
            <div>
              <p>Cahootz</p>
              <p>Welcome {currentUser.username}!</p>
              <button onClick={this.handleClick}>Sign Out</button>
            </div>
          </div>
          <aside className='channel-index'>
            Channel Nav
            <div className='channel-list-outer'>
              <p>Channels</p>
              <ul className='channel-list'>
                <li className='list-item'>ch 1</li>
                <li className='list-item'>ch 2</li>
                <li className='list-item'>ch 3</li>
              </ul>
            </div>
            <div className='dm-list-outer'>
              <p>Direct Messages</p>
              <ul className='dm-list'>
                <li className='list-item'>dm 1</li>
                <li className='list-item'>dm 2</li>
                <li className='list-item'>dm 3</li>
              </ul>
            </div>
          </aside>
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
    currentUser: state.currentUser
  };
};

export default connect(
  mapStateToProps,
  dispatch => ({ logOut: () => dispatch(logOut()) })
)(MainChannel);
