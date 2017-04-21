import { connect } from 'react-redux';
import { fetchSingleChannel } from '../../actions/channel_actions';
import ChannelDeatil from './channel_detail';
import { allChannels } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  channel: selectChannel(state, ownProps);
};

// const mapDispatchToProps = (dispatch) => {
//   fetchAllChannels: () => dispatch(fetchAllChannels())
// };

export default connect(
  mapStateToProps,
  null
)(ChannelDeatil);
