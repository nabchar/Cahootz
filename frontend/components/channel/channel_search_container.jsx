import { connect } from 'react-redux';
import { fetchAllChannels } from '../../actions/channel_actions';
import ChannelSearch from './channel_search';
import { allChannels } from '../../reducers/selectors';

const mapStateToProps = (state) => {
  channels: allChannels(state);
};

const mapDispatchToProps = (dispatch) => {
  fetchAllChannels: () => dispatch(fetchAllChannels())
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelSearch);
