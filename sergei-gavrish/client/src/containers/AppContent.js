import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { TextField, Button, Divider } from '@material-ui/core';

import socket from '../socket'

import UsersContainer from './UsersContainer';
import RoomsContainer from './RoomsContainer';
import ChatContainer from './ChatContainer';

export default class AppContent extends Component {

  state = {
    chat: null,
    privateChat: {
      chat: null,
      user: null,
    }
  }

  componentDidMount() {
  }

  chooseChat = title => {
    this.setState({ chat: title })
  };

  choosePrivateChat = (title, userId) => {
    console.log({title, userId});
    this.setState({
      privateChat:{
        chat: title,
        user: userId
      }})
  };

  renderChat = () => {
    if (!this.state.chat && !this.state.privateChat.chat) {
      return (
        <div style={{
          display: 'flex', flex: '1', height: '100vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
        }}>
          Choose chat
    </div>
      )
    } else {
      return <ChatContainer room={this.state.chat || this.state.privateChat.chat} />
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ display: 'flex', flex: '1', justifyContent: 'space-around' }}>
          <RoomsContainer onClick={this.chooseChat} newPrivateChat={this.state.privateChat.chat ? this.state.privateChat : null}/>
          <UsersContainer onClick={this.choosePrivateChat} />
        </div>
        {this.renderChat()}
      </div>
    )
  }
}
