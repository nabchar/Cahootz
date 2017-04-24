import React from 'react';
import { connect } from 'react-redux';
import { allMessages } from '../../reducers/selectors';
import MessageIndexItem from './message_index_item';

const mapStateToProps = ({ messages }) => {
  return {
    messages: allMessages(messages)
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//
//   };
// };

class MessageIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let messageList = this.props.messages.map(message => {
      return (<MessageIndexItem key={message.id}
                                message={message} />);
    });

    return (
      <div className='message-index-outer'>
        <section className='message-index'>
          { messageList }
        </section>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(MessageIndex);
