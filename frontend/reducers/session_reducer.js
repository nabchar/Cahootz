import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const _nullUser = Object.freeze({
  currentUser: null
});

const SessionReducer = (state = _nullUser, action) => {
  Object.freeze(state)
  let nextState;
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser;
      nextState = Object.assign({}, _nullUser);
      return Object.assign({}, currentUser);
    default:
      return state;
  }
};

export default SessionReducer;
