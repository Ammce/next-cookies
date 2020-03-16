import React, { Component } from 'react';
import Router from 'next/router';

import { autuUser } from '../lib/auth';

class LoginForm extends Component {
  state = {
    email: 'Sincere@april.biz',
    password: 'hildegard.org',
  };

  handleChange = e => {
    e.persist();
    this.setState(state => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    autuUser(email, password).then(() => {
      Router.push('/profile');
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form>
          <div>
            <label>Email</label>
            <input
              type='text'
              name='email'
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type='text'
              name='password'
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type='submit'
              name='email'
              value='Submit'
              onClick={this.handleSubmit}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
