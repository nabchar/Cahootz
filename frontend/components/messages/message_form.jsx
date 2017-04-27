import React from 'react';
import { connect } from 'react-redux';
import { createMessage } from '../../actions/message_actions';

const mapStateToProps = ({channels, direct_messages, session}, ownProps) => {
  return {
    currentChannelId: ownProps.currentChannelId,
    channels,
    direct_messages,
    currentUser: session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createMessage: (message, currentChannelId) => dispatch(createMessage(message, currentChannelId))
  };
};

class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {content: ''};
    this.updateInput = this.updateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  updateInput(e) {
    let value = e.currentTarget.value;
    this.setState({content: value});
  }

  handleSubmit(e) {
    e.preventDefault();
    let { currentChannelId } = this.props;
    currentChannelId = parseInt(currentChannelId);
    if (this.state.content === '') {
      return;
    } else {
      this.props.createMessage(this.state, currentChannelId)
      .then(() => this.clearForm());
    }
  }

  clearForm() {
    this.setState({content: ''});
  }

  render() {
    let channelName;
    let currentChannel = this.props.channels[this.props.currentChannelId];
    if (currentChannel) {
      channelName = `#${currentChannel.name}`;
    } else {
      let dm = this.props.direct_messages[this.props.currentChannelId];
      if ((dm.memberCount - 1) === 0) {
        channelName = `yourself`;
      } else if ((dm.memberCount - 1) === 1){
        let member = dm.members.filter(user => user.id !== this.props.currentUser.id);
        channelName = `@${member[0].username}`;
      } else {
        return;
      }
    }

    return (
      <footer className='message-input-outer'>
        <div className='message-input-inner'>
          <form className='m-form'
                onSubmit={this.handleSubmit}>
            <input type='text'
                   value={this.state.content}
                   onChange={this.updateInput}
                   placeholder={'Message  ' + channelName}/>
            <input type='submit' />
          </form>
        </div>
      </footer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageForm);
