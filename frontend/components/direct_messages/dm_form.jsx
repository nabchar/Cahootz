import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { allUsers } from '../../reducers/selectors';
import { createDirectMessage,
         subscribeToChannel,
         fetchDirectMessage } from '../../actions/channel_actions';

const mapStateToProps = ({session, errors, users, direct_messages}) => {
  return {
    errors,
    usersArray: allUsers(users),
    users,
    currentUser: session.currentUser,
    direct_messages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    create: (members) => dispatch(createDirectMessage(members)),
    subscribe: (channelId) => dispatch(subscribeToChannel(channelId)),
    fetch: (id) => dispatch(fetchDirectMessage(id))
  };
};

class DMForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { members: [],
                   user_id: this.props.currentUser.id,
                   disabled: true};

    this.addMember = this.addMember.bind(this);
    this.removeMember = this.removeMember.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addMember(e) {
    let updateMembers = this.state.members;
    let newMemberId = e.currentTarget.value;
    let newMember = this.props.users[newMemberId];
    updateMembers.push(newMember);
    this.setState({members: updateMembers});
    this.setState({disabled: false});
  }

  removeMember(e) {
    let memberList = this.state.members;
    let memberId = parseInt(e.currentTarget.getAttribute('value'));
    let newMemberList = memberList.filter(member => member.id !== memberId);
    this.setState({members: newMemberList});

    if (newMemberList.length < 1) {
      this.setState({disabled: true});
    }
  }

  handleSubmit(e) {
    let url;
    let channelId;
    let members = this.state.members;
    const { subscribe, fetch } = this.props;

    this.props.create(members)
      .then(res => {
        channelId = res.dm.id;
        url = '/messages/' + channelId;
        return subscribe(channelId);
      }).then(res => {
        return fetch(channelId);
      })
      .then(res => {
        hashHistory.push(url);
      }).then(() => this.props.closeModal());
  }

  render() {
    let usersList = this.props.usersArray.map(user => {
      for (let i = 0; i < this.state.members.length; i++) {
        if (this.state.members[i].id === user.id) {
          return;
        }
      }
      return (
        <li className='user-list-item'
            onClick={this.addMember}
            value={user.id}
            key={user.id}>
          <p><span>@{user.username}</span><span className='hover-message'>Add User</span></p>
        </li>
      );
    });

    let membersList = this.state.members.map(member => {
      return (
        <span key={member.id}
                onClick={this.removeMember}
                value={member.id}>{member.username}
              <i className="fa fa-times" aria-hidden="true"></i>
        </span>
      );
    });

    return (
      <div className='dm-main'>
        <section className='dm-form'>
          <h1>Direct Messages</h1>
          <h3>Start a conversation!</h3>
          <div>
            <p placeholder='Find or start a conversation'>{membersList}</p>
            <button onClick={this.handleSubmit}
                    disabled={this.state.disabled}>Go</button>
          </div>
          <ul>
            {usersList}
          </ul>
        </section>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(DMForm);
