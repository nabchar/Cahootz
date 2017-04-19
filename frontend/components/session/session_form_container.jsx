import { connect } from 'react-redux';
import { signIn, signUp} from '../../actions/session_actions';
import { receiveErrors } from '../../actions/shared/error_actions';
import { Link, withRouter } from 'react-router';
import SessionForm from './session_form'

const mapStateToProps = (state, ownProps) => {
  let authMessage = 'Sign up for Cahoots';
  let formType = 'Signup';
  if (ownProps.location.pathname === '/signin') {
    authMessage = 'Sign in to Cahoots';
    formType = 'Signin';
  }
  return {
    errors: state.errors,
    formType,
    authMessage
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let authAction = signUp;
  if (ownProps.location.pathname === '/signin') {
    authAction = signIn;
  }
  return {
    authAction: (user) => dispatch(authAction(user)),
    clearErrors: () => dispatch(receiveErrors({})),
  };
};

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(SessionForm));