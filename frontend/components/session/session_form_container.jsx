import { connect } from 'react-redux';
import { logIn, signUp} from '../../actions/session_actions';
import { receiveErrors } from '../../actions/shared/error_actions';
import { Link } from 'react-router';
import SessionForm from './session_form'

const mapStateToProps = (state, ownProps) => {
  let loggedIn = state.session.currentUser ? true : false;
  let formType = (ownProps.location.pathname === '/login') ? 'LOGIN' : "SIGNUP";
  return {
    loggedIn: loggedIn,
    errors: state.session.errors,
    formType: formType
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let formType = (ownProps.location.pathname === '/login') ? logIn : signUp;
  return {
    processForm: (user) => dispatch(formType(user)),
    clearErrors: () => dispatch(receiveErrors({}))
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(SessionForm);
