import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import ErrorReducer from './shared/error_reducer';
import ChannelsReducer from './channels_reducer';

const RootReducer = combineReducers({
  currentUser: SessionReducer,
  channels: ChannelsReducer,
  errors: ErrorReducer
});

export default RootReducer;
