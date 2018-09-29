import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';

import socket from '../socket';

export class RoomsContainer extends Component {

  state = {
    rooms: [],
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/rooms/getRooms')
      .then(response => response.json())
      .then(result => result.filter(room => room.users.some(user => user._id === this.props.user._id)))
      .then(result => this.setState({ rooms: this.state.rooms.concat(result) }))
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {this.state.rooms.map((room, index) => (
          <p
            key={index}
            style={{
              cursor: 'pointer'
            }}
            onClick={() => this.props.onClick(room.title)}
          >
            {room.title}
          </p>
        ))}
      </div>
    )
  }

}

const mapStateToProps = (state, OwnProps) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(RoomsContainer)
