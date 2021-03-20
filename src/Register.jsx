import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import bcrypt from 'bcryptjs';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      message: '',
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      source: 'https://via.placeholder.com/50',
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
    this.handleLastnameChange = this.handleLastnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handleFirstnameChange(event) {
    this.setState({ firstname: event.target.value });
  }

  handleLastnameChange(event) {
    this.setState({ lastname: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log('handlesubmit');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.state.password, salt);

    const {
      username, firstname, lastname, password, email, source,
    } = this.state;
    const vars = {
      username, firstname, lastname, password: hashedPassword, email, source,
    };

    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vars),
    })
      .then(response => response.json())
      .then((response) => {
        if (response.success) {
          this.setState({ success: true });
          this.setState({ message: '' });
        } else {
          this.setState({ message: response.message });
        }
      });
  }

  render() {
    if (this.state.success) {
      return <Button size="lg" variant="success" href="/login" block> Register success! Click here to Log in.</Button>;
    }

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
        <h3>Register</h3>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            required
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />
        </div>

        <div className="form-group">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            required
            value={this.state.firstname}
            onChange={this.handleFirstnameChange}
          />
        </div>

        <div className="form-group">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            required
            value={this.state.lastname}
            onChange={this.handleLastnameChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            required
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            required
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </div>
        {message}
        <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
        <hr />
        <p className="text-center">
          Already registered?
          {' '}
          <a href="/login">Log in</a>
        </p>
      </form>
    );
  }
}
