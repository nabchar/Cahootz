import { connect } from 'react-redux';
import { signIn, signUp} from '../../actions/session_actions';
import { receiveErrors } from '../../actions/shared/error_actions';
import SessionForm from './session_form';
import { fetchAllChannels } from '../../actions/channel_actions';

const mapStateToProps = (state, ownProps) => {
  let authMessage = 'Sign up for Cahoots';
  let formType = 'Sign up';
  if (ownProps.location.pathname === '/signin') {
    authMessage = 'Sign in to Cahoots';
    formType = 'Sign in';
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
    signInGuest: () => dispatch(
        signIn({user: {username: 'guest', password: 'password' }})),
    fetchAllChannels: () => dispatch(fetchAllChannels())
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(SessionForm);
