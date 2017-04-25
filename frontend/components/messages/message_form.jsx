import React from 'react';
import { connect } from 'react-redux';
import { createMessage } from '../../actions/message_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    currentChannelId: ownProps.currentChannelId,
    currentChannel: state.channels[ownProps.currentChannelId]
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
    this.props.createMessage(this.state, currentChannelId)
      .then(() => this.clearForm());
  }

  clearForm() {
    this.setState({content: ''});
  }

  render() {
    let {currentChannel} = this.props;
    return (
      <footer className='message-input-outer'>
        <div className='message-input-inner'>
          <form className='m-form'
                onSubmit={this.handleSubmit}>
            <input type='text'
                   value={this.state.content}
                   onChange={this.updateInput}
                   placeholder={'Message  #' + currentChannel.name}/>
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
