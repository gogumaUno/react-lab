import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';

import socket from '../socket';

export default class RoomsContainer extends Component {

  state = {
    rooms: [],
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/rooms/getRooms')
      .then(response => response.json())
      .then(result => this.setState({ rooms: this.state.rooms.concat(result) }))
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {this.state.rooms.map(room => (
          <p style={{
            cursor: 'pointer'
          }}>
            {room.title}
          </p>
        ))}
      </div>
    )
  }

}
