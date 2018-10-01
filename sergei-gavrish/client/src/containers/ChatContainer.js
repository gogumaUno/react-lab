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
    console.log(this.props.room)
    socket.emit('join', this.props.room)
    socket.on('joined_room', messages => {
      this.setState({
        messages: this.state.messages.concat(messages),
      })
    })
    socket.on('recieve_message', message => {
      console.log('111111111111111')
      this.setState({
        messages: this.state.messages.concat(message),
      }, () => console.log(this.state.messages))
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.room !== this.props.room) {
      if (!prevState.messages.length) {
        'delete room'
      }
      socket.emit('leave', prevProps.room);
      socket.emit('join', this.props.room);
      this.setState({ messages: [] })
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    socket.emit('message', { text: this.state.message, user: this.props.user._id, room: this.props.room });
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
          {this.state.messages.map(message => {
            console.log(message);
            return (
              <Message
                key={message._id}
                message={message.text}
                currentUserId={this.props.user._id}
                messageUserId={message.user}
                date={message.date}
              />
            )
          })}
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
