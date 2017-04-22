import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import ChannelIndex from './channel_index';
import { fetchAllChannels } from '../../actions/channel_actions';

const mapStateToProps = (state, ownProps) => {
  let {channels} = ownProps;
  const subscribedChannels = state.session.subscriptions.map( sub => {
      return state.channels[sub.id];
    }
  );


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
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelIndex));
