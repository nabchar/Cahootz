import { connect } from 'react-redux';
import {withRouter} from 'react-router'
import ChannelIndex from './channel_index';
import { fetchAllChannels } from '../../actions/channel_actions';

const mapStateToProps = (state) => {
  debugger

  const subscribedChannels = state.session.subscriptions.map( sub => {
      return state.channels[sub.id];
    }
  );

  debugger

  return {
    currentUser: state.session.currentUser,
    subscribedChannels,
    channels
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllChannels: () => dispatch(fetchAllChannels())
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelIndex))
