import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { TextField, Button, Divider } from '@material-ui/core';

import socket from '../socket'

import UsersContainer from './UsersContainer';
import RoomsContainer from './RoomsContainer';
import ChatContainer from './ChatContainer';

export default class AppContent extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <div style={{display: 'flex', flex: '1', justifyContent: 'space-around'}}>
          <RoomsContainer />
          <UsersContainer />
        </div>
        <ChatContainer />
      </div>
    )
  }
}
