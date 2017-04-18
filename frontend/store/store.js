import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import RootReducer from '../reducers/root_reducer';

const configureStore = (preloadedState = {}) => {
  let logger = createLogger();

  return createStore(
    RootReducer,
    preloadedState,
    applyMiddleware(thunk, logger));
};

export default configureStore;
