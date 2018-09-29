import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { TextField, Button, Divider } from '@material-ui/core';

import socket from '../socket'

export default class AppContent extends Component {

  state = {
    users: []
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/users/getUsers')
      .then(response => response.json())
      .then(result => this.setState({ users: this.state.users.concat(result) }))
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {this.state.users.map(user => (
          <p style={{
            cursor: 'pointer'
          }}>
            {user.login}
          </p>
        ))}
      </div>
    )
  }
}
