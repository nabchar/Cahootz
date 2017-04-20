import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import ErrorReducer from './shared/error_reducer';
import ChannelReducer from './channel_reducer';

const RootReducer = combineReducers({
  currentUser: SessionReducer,
  channels: ChannelReducer
  errors: ErrorReducer
});

export default RootReducer;
