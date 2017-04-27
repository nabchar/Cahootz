import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const _nullUser = {
  currentUser: null,
  subscriptions: []
};

const SessionReducer = (state = _nullUser, action) => {
  Object.freeze(state)
  let nextState;
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      nextState = Object.assign({}, _nullUser, action.user);
      return nextState;
    default:
      return state;
  }
};

export default SessionReducer;
