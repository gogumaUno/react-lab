import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';

import socket from '../socket';
import Message from '../components/Message';

class ChatContainer extends Component {
  state = {
    message: '',
    messages: [],
  }

  checkUser = () => {
    const { token, expiresIn } = this.props.user;

    if (expiresIn < Date.now()) alert('Token expired');
  }

  componentDidMount() {
    console.log('Qooooooo')
    socket.emit('join', this.props.room)
    socket.on('joined_room', messages => {
      this.setState({
        messages: this.state.messages.concat(messages),
      })
    })
    socket.on('recieve_message', (message) => {
      console.log({ message });
      this.setState({
        messages: this.state.messages.concat(message),
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log({prevProps, prevState})
    if (prevProps.room !== this.props.room) {
      socket.emit('leave', prevProps.room);
      socket.emit('join', this.props.room);
      this.setState({messages: []})
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log({ message: this.state.message, room: this.props.room, user: this.props.user._id });
    socket.emit('message', { message: this.state.message, room: this.props.room, user: this.props.user._id });
    this.setState({
      message: '',
    });
  }

  onChange = event => (
    this.setState({
      message: event.target.value,
    })
  )

  render() {
    return (
      <div style={{
        display: 'flex', flex: '1', height: '100vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
      }}>
        <div style={{
          display: 'flex', flex: '1', flexDirection: 'column'
        }}>
          {this.state.messages.map((message, index) => (
            <Message
              key={index}
              message={message.message}
              currentUserId={this.props.user._id}
              messageUserId={message.user}
              date={message.date}
            />
          ))}
        </div>
        <form onSubmit={this.handleSubmit} style={{
          display: 'flex', flex: '1', flexDirection: 'column'
        }}>
          <TextField name="message" value={this.state.message} onChange={this.onChange} />
          <Button type="submit">SEND</Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, OwnProps) => {
  return {
    user: state.user,
    messages: state.messages,
    room: OwnProps.room,
  }
}

export default connect(mapStateToProps)(ChatContainer)
