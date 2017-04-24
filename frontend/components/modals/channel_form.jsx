import React from 'react';
import { hashHistory } from 'react-router';
import ErrorList from '../shared/errors';
import { connect } from 'react-redux';
import {  createChannel,
          subscribeToChannel,
          fetchChannel } from '../../actions/channel_actions';
import { clearErrors } from '../../actions/shared/error_actions';

const mapStateToProps = ({errors, session}) => {
  return {
    errors,
    currentUser: session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    create: (channel) => dispatch(createChannel(channel)),
    subscribe: (channelId) => dispatch(subscribeToChannel(channelId)),
    fetch: (id) => dispatch(fetchChannel(id)),
    clearErrors: () => dispatch(clearErrors())
  };
};

class ChannelForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: '',
                   purpose: '',
                   user_id: this.props.currentUser.id };

    this.updateInput = this.updateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  handleSubmit(e) {
    e.preventDefault();
    let url;
    let channelId;
    const channel = this.state;
    const { currentUser, subscribe, fetch } = this.props;

    this.props.create(channel)
      .then(res => {
        channelId = res.channel.id;
        url = '/messages/' + channelId;
        return subscribe(channelId);
      }).then(res => {
        return fetch(channelId);
      })
      .then(res => {
        hashHistory.push(url);
      }).then(() => this.props.closeModal());
  }

  handleClick(e) {
    this.props.closeModal().then(() => this.props.clearErrors());
  }

  updateInput(field) {
    return (e) => {
      if (field === 'name') {
        const value = e.currentTarget.value;
        const lastChar = value[value.length - 1];
        if (lastChar !== ' ' && lastChar !== '.' && value.length <= 22) {
          this.setState({[field]: e.currentTarget.value.toLowerCase()});
        }
      } else {
        this.setState({[field]: e.currentTarget.value});
      }
    };
  }

  render() {
    let { errors } = this.props;

    return(
      <div className="channel-form-main">
        <section className="channel-form">
          <h1>Create a new channel</h1>
          <span className="sub-header">
            Channels are where you communicate with. They are best
            organized around a topic.
          </span>

          <form onSubmit={this.handleSubmit}>
            <label className="channel-form-label">Name
              <input
                type="text"
                value={this.state.name}
                placeholder="# e.g new_schemes"
                onChange={this.updateInput('name')} />
            </label>
            <ErrorList errors={errors.name} errorType={'Name '} />

            <p className="form-info">
              Names must be lowercase, less than 22 characters, and cannot contain spaces or periods.
            </p>

            <label className="channel-form-label">Purpose (optional)
              <input
                type="text"
                value={this.state.purpose}
                onChange={this.updateInput('purpose')} />
            </label>
            <p className="form-info">
              What's this channel about?
            </p>

            <div className='channel-form-buttons'>
              <button className='cancelButton'
                      onClick={this.handleClick}>Cancel</button>
              <input className="channel-form-submit"
                     type="submit"
                     value="Create channel"/>
            </div>
          </form>
        </section>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(ChannelForm);
