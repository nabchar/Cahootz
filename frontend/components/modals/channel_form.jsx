import React from 'react';

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
    const channel = this.state;
    this.props.createChannel(channel);
    this.props.closeModal();
  }

  handleClick(e) {
    this.props.closeModal();
  }

  updateInput(field) {
    return (e) => {
      if (field === 'name') {
        const value = e.currentTarget.value;
        const lastChar = value[value.length - 1];
        if (lastChar !== ' ' && lastChar !== '.' && value.length <= 21) {
          this.setState({[field]: e.currentTarget.value.toLowerCase()});
        }
      } else {
        this.setState({[field]: e.currentTarget.value});
      }
    };
  }

  render() {
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
            <p className="form-info">
              Names must be 21 characters or less, lowercase, and cannot contain spaces or periods.
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

export default ChannelForm;
