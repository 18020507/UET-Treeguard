import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      emailOrUsername: '',
      password: '',
    };

    this.handleEmailOrUsernameChange = this.handleEmailOrUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailOrUsernameChange(event) {
    this.setState({ emailOrUsername: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { emailOrUsername, password } = this.state;
    await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailOrUsername,
        password,
      }),
    })
      .then(response => response.json())
      .then((response) => {
        if (!response.success) this.setState({ message: response.message });
        else {
          this.setState({ message: response.message });
          localStorage.setItem('AUTH_TOKEN', response.token);
          localStorage.setItem('USER_ID', response.userData.id);
          // console.log(localStorage.getItem('AUTH_TOKEN'));
          window.location.href = '/home';
        }
      });
  }


  render() {
    let message;
    if (this.state.message) {
      message = (
        <p style={{ color: 'red' }}>
          {' '}
          {this.state.message}
          {' '}
        </p>
      );
    }
    return (
      <form onSubmit={this.handleSubmit}>

        <h3>Log in</h3>

        <div className="form-group">
          <label>Email or username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter email"
            required
            value={this.state.emailOrUsername}
            onChange={this.handleEmailOrUsernameChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            required
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </div>

        {message}
        <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
        <hr />
        <div className="text-center">
          Don't have an account?
          {' '}
          <a href="/register">Register</a>
        </div>
      </form>

    );
  }
}

export default Login;
