import React from 'react';
import { connect } from 'react-redux';
import { allUsers } from '../../reducers/selectors';

const mapStateToProps = ({session, errors, users}) => {
  return {
    errors,
    usersArray: allUsers(users),
    users,
    currentUser: session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

class DMForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {members: [], user_id: this.props.currentUser.id};

    this.addMember = this.addMember.bind(this);
    this.removeMember = this.removeMember.bind(this);
  }

  addMember(e) {
    let updateMembers = this.state.members;
    let newMemberId = e.currentTarget.value;
    let newMember = this.props.users[newMemberId];
    updateMembers.push(newMember);
    this.setState({members: updateMembers});
  }

  removeMember(e) {
    let memberList = this.state.members;
    let memberId = parseInt(e.currentTarget.getAttribute('value'));
    let newMemberList = memberList.filter(member => member.id !== memberId);
    this.setState({members: newMemberList});
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
          <p><span>{user.username}</span></p>
        </li>
      );
    });

    let membersList = this.state.members.map(member => {
      return (
        <span key={member.id}
                onClick={this.removeMember}
                value={member.id}>{member.username} x</span>
      );
    });

    return (
      <div className='dm-main'>
        <section className='dm-form'>
          <h1>Direct Messages</h1>
          <form>
            <p placeholder='Find or start a conversation'>{membersList}</p>
            <input type='submit' value='GO' />
          </form>
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
