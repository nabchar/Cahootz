import React from 'react';
import { receiveErrors } from '../../actions/shared/error_actions';
import { Link, hashHistory } from 'react-router';
import ErrorList from '../shared/errors';


class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: "", password: ""};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.formType !== newProps.formType) {
      this.props.clearErrors();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.authAction({user: this.state}).then( () => this.clearForm())
      .then(() => this.props.router.push("/"));
  }

  clearForm() {
    this.setState({username: "", password: ""});

  }

  handleChange(field) {
    return (e) => {
      this.setState({[field]: e.currentTarget.value});
    };
  }


  render () {
    let { formType, errors, authMessage } = this.props;
    let newPath = (formType === "Signin") ? '/signup' : '/signin';

    return (
      <div className='auth-form-box'>
        <form className='auth-form' onSubmit={this.handleSubmit}>
          <span>{authMessage}</span>
          <span>Enter your username and password</span>
          <ErrorList errors={errors.base} />
          <label>
            <span>Username:</span>
            <input className="auth-input" onChange={this.handleChange('username')}
                             value={this.state.username}/>
          </label>

          <ErrorList errors={errors.username} />

          <label>
            <span>Password:</span>
            <input className="auth-input" type="password"  onChange={this.handleChange('password')} value={this.state.password}/>
          </label>

          <ErrorList errors={errors.password} />

          <input type="submit" value={formType} />
        </form>
      </div>
    );
  }

}

export default SessionForm;
