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
      .then(() => hashHistory.push("/main"));
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
    let linkName = (newPath === '/signin') ? 'Sign In' : 'Sign Up'

    return (
      <div>
        <header className="session-header">
          <p>
            <Link className="session-logo" to={'/'}>
              <i className="fa fa-slack" aria-hidden="true"></i>
              <strong>cahootz</strong>
            </Link>
          </p>
          <p>
            <Link className='session-header-link' to={newPath}>{linkName}</Link>
          </p>
        </header>

        <section className='session-content'>
          <form className='session-form' onSubmit={this.handleSubmit}>
            <h1>{authMessage}</h1>

            <section className='session'>
              <p>Enter your username and password</p>
              <p className='session-username'>
                <input className='auth-input'
                  onChange={this.handleChange('username')}
                  value={this.state.username}
                  placeholder='you@cahootz.com'/>
              </p>
              <ErrorList errors={errors.username} />

              <p className='session-password'>
                <input className="auth-input"
                  type="password"
                  onChange={this.handleChange('password')}
                  value={this.state.password}
                  placeholder="password"/>
              </p>
              <ErrorList errors={errors.password} />

              <ErrorList errors={errors.base} />

              <p className='session-submit'>
                <input type="submit" value={formType} />
              </p>

            </section>
          </form>
        </section>
      </div>
    );
  }
}

export default SessionForm;
