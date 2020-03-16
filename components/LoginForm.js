import React, { Component } from 'react';
import Router from 'next/router';

import { autuUser } from '../lib/auth';

class LoginForm extends Component {
  state = {
    email: 'Sincere@april.biz',
    password: 'hildegard.org',
    error: '',
    isLoading: false,
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
    this.setState(state => {
      return { ...state, err: '', isLoading: true };
    });

    autuUser(email, password)
      .then(() => {
        Router.push('/profile');
      })
      .catch(this.showError);
  };

  showError = err => {
    console.error(err);
    this.setState(state => {
      return {
        ...state,
        isLoading: false,
        error: (err.response && err.response.data) || err.message,
      };
    });
  };

  render() {
    const { email, password, error, isLoading } = this.state;
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
            <button
              type='submit'
              disabled={isLoading}
              onClick={this.handleSubmit}
            >
              {isLoading ? 'Sending...' : 'Send'}{' '}
            </button>
          </div>
        </form>
        {error && <div> {error} </div>}
      </div>
    );
  }
}

export default LoginForm;
