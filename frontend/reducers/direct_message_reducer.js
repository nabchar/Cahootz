import { RECEIVE_DIRECT_MESSAGES,
         RECEIVE_DIRECT_MESSAGE } from '../actions/channel_actions';

let _defaultState = {
  isFetching: false
};

const DirectMessageReducer = (oldState=_defaultState, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_DIRECT_MESSAGES:
      return Object.assign({}, action.dms);
    case RECEIVE_DIRECT_MESSAGE:
      return Object.assign({}, oldState, {[action.dm.id]: action.dm});
    default:
      return oldState;
  }
};

export default DirectMessageReducer;
