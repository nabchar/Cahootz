import { RECEIVE_USERS } from '../actions/session_actions';

const _defaultState = {
  isFetching: true
};

const UsersReducer = (oldState = _defaultState, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_USERS:
      return Object.assign({}, action.users);
    default:
      return oldState;
  }
};

export default UsersReducer;
