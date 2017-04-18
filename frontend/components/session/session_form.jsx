import React from 'react';
import { logIn, signUp} from '../../actions/session_actions';
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
    this.props.processForm({user: this.state}).then( () => this.clearForm())
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
    let redirectionPath = (this.props.formType === "LOGIN") ? 'signup' : 'login';
    const { errors, formType } = this.props;
    return (
      <div className='auth-form-container'>
        <form className='auth-form' onSubmit={this.handleSubmit}>
          <span>{formType}!</span>
          <ErrorList errors={errors.base} />
          <label>
            <span>Username:</span>
            <input className="auth-input" onChange={this.handleChange("username")}
                             value={this.state.username}/>
          </label>

          <ErrorList errors={errors.username} />

          <label>
            <span>Password:</span>
            <input className="auth-input" type="password"  onChange={this.handleChange("password")} value={this.state.password}/>
          </label>

          <ErrorList errors={errors.password} />

          <input type="submit" value={formType} />
          <Link to={"/" + redirectionPath} >{redirectionPath}</Link>
        </form>
      </div>
    );
  }

}

export default SessionForm;
