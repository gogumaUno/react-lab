import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { TextField, Button, Divider } from '@material-ui/core';

import socket from '../socket'

import UsersContainer from './UsersContainer';
import RoomsContainer from './RoomsContainer';
import ChatContainer from './ChatContainer';

export default class AppContent extends Component {

  state = {
    room: null,
  }

  componentDidMount() {
  }

  handleClick = value => {
    this.setState({ room: value })
  };

  renderChat = () => {
    if (!this.state.room) {
      return (
        <div style={{
          display: 'flex', flex: '1', height: '100vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
        }}>
          Choose chat
    </div>
      )
    } else {
      return <ChatContainer room={this.state.room} />
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ display: 'flex', flex: '1', justifyContent: 'space-around' }}>
          <RoomsContainer onClick={this.handleClick} />
          <UsersContainer onClick={this.handleClick} />
        </div>

        {this.renderChat()}
      </div>
    )
  }
}
