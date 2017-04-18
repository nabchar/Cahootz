import {
    RECEIVE_ERRORS,
    receiveErrors } from '../../actions/shared/errors_actions';

const _defaultState = Object.freeze({
  error: {}
});

const ErrorReducer = (oldState = _defaultState, action) => {
  Object.freeze(oldState)
  switch(action.type) {
    case RECEIVE_ERRORS:
      const errors = action.errors;
      return Object.assign({}, action.errors);
    default:
      return oldState;
  }
};

export default ErrorReducer;
