import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

class MessageForm extends React.component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <footer className='message-input-outer'>
        <div className='message-input-inner'>
          Message Input
        </div>
      </footer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageForm);
