import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';

import socket from '../socket';
import Message from '../components/Message';

class ChatContainer extends Component {

  state = {
    room: 'AHAHAA',
    message: '',
    messages: [],
  }

  checkUser = () => {
    const { token, expiresIn } = this.props.user;

    if (expiresIn < Date.now()) alert('Token expired');
  }

  componentDidMount() {
    socket.emit('join', this.state.room)
    socket.on('recieve_message', (message) => {
      console.log(this.state.messages);
      // this.setState({
      //   messages: this.state.messages.concat(message),
      // })
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    // console.log(this.state.message);
    socket.emit('message', { message: this.state.message, room: this.state.room, user: user._id });
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
          display: 'flex', flexDirection: 'column'
        }}>
          {this.state.messages.map(message => (
            <Message
              message={message}
              currentUserId
              messageUserId
              message
              date
            />))}
        </div>
        <form onSubmit={this.handleSubmit}>
          <TextField name="message" value={this.state.message} onChange={this.onChange} />
          <Button type="submit">SEND</Button>
        </form>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  user: state.user,
  messages: state.messages,
})

export default connect(mapStateToProps)(ChatContainer)
