import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';

import socket from '../socket';

export class RoomsContainer extends Component {

  state = {
    rooms: {},
    roomsTitles: []
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/rooms/getRooms')
      .then(response => response.json())
      .then(result => result.filter(room => room.users.some(user => user._id === this.props.user._id)))
      .then(result => {
        console.log(result)
        result.map(room => {
          console.log(room);
          this.setState(prevState => ({
            rooms: {
              ...prevState.rooms,
              [room.title]: room,
            },
            roomsTitles: prevState.roomsTitles.concat([room.title]),
          }))
        })
      })
    socket.on('NEW_ROOM', room => this.setState((prevState, props) => ({
      rooms: {
        ...prevState.rooms,
        [room.title]: room,
      },
      roomsTitles: prevState.roomsTitles.concat([room.title]),
    })))
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.newPrivateChat && !this.state.rooms[this.props.newPrivateChat.chat]) {
      // this.setState((prevState, props) => ({
      //   rooms: {
      //     ...prevState.rooms,
      //     [this.props.newPrivateChat.chat]: {
      //       'title': this.props.newPrivateChat.chat,
      //     },
      //   },
      //   roomsTitles: prevState.roomsTitles.concat([this.props.newPrivateChat.chat]),
      // }))
      // socket.emit('new_private_room', { user: user._id, room: this.props.newPrivateChat.chat })
      fetch(`http://localhost:8080/api/rooms/newRoom`, {
        method: 'POST',
        body: JSON.stringify({
          title: this.props.newPrivateChat.chat,
          userId: this.props.user._id,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {this.state.roomsTitles.map(room => (
          <p
            key={this.state.rooms[room]._id}
            style={{
              cursor: 'pointer'
            }}
            onClick={() => this.props.onClick(this.state.rooms[room].title)}
          >
            {this.state.rooms[room].title}
          </p>
        ))}
        <button>Add chat</button>
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
