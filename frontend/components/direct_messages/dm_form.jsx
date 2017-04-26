import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({session, errors, users}) => {
  return {
    errors,
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
  }

  render() {
    return (
      <div className='dm-main'>
        <section className='dm-form'>
          <h1>Direct Messages</h1>
          <form >
            <input type='text' value=''/>
            <input type='submit' value='Go' />
          </form>
          <ul>
            <li>member</li>
            <li>member</li>
            <li>member</li>
          </ul>
        </section>
      </div>
    );
  }
}

export default DMForm;
