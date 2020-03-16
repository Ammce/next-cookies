import React, { Component } from 'react';
import { getUserProfile } from '../lib/auth';

export default class Profile extends Component {
  state = {
    user: null,
  };

  async componentDidMount() {
    const user = await getUserProfile();
    this.setState(state => {
      return { ...state, user };
    });
  }

  render() {
    const { user } = this.state;
    return <pre> {JSON.stringify(user, null, 2)} </pre>;
  }
}
