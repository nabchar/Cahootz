import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const _nullUser = {};

const SessionReducer = (state = _nullUser, action) => {
  Object.freeze(state)
  let nextState;
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser;
      nextState = Object.assign({}, _nullUser);
      const finalnextState = Object.assign(nextState, currentUser);
      debugger
      return finalnextState;
    default:
      return state;
  }
};

export default SessionReducer;
