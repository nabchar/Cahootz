import React from 'react';
import { connect } from 'react-redux';
import { createMessage } from '../../actions/message_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    currentChannelId: ownProps.currentChannelId
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
  }

  updateInput(e) {
    let value = e.currentTarget.value;
    this.setState({content: value});
  }

  handleSubmit(e) {
    e.preventDefault();
    let { currentChannelId } = this.props;
    currentChannelId = parseInt(currentChannelId);
    this.props.createMessage(this.state, currentChannelId);
  }

  render() {
    return (
      <footer className='message-input-outer'>
        <div className='message-input-inner'>
          <form onSubmit={this.handleSubmit}>
            <input type='text'
                   value={this.state.content}
                   onChange={this.updateInput}/>
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
