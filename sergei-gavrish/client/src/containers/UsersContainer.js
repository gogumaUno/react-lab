import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { TextField, Button } from '@material-ui/core';

import socket from '../socket'

export default class UserContainer extends Component {

  state = {
    users: [],
    matches: [],
    search: '',
    focus: false,
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/user/getUsers')
      .then(response => response.json())
      .then(result => this.setState({ users: this.state.users.concat(result) }));
    socket.on('user_created', user => this.setState({ users: this.state.users.concat([user]) }));
  }

  searchHandler = event => {
    this.setState({ search: event.target.value }, () => this.findMatches(this.state.search))
  }

  focusHandler = () => {
    this.setState({ focus: !this.state.focus });
  }

  findMatches = (wordToMatch) => {
    const matches = this.state.users.filter(({ profile }) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return profile.login.match(regex);
    });
    return this.setState({ matches: matches });
  }
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <form>
          <input
            onFocus={this.focusHandler}
            onBlur={this.focusHandler}
            type="text"
            placeholder="User..."
            value={this.state.search}
            onClick={this.searchHandler}
            onChange={this.searchHandler}
          />
          <ul style={{ padding: '0' }}>
            {this.state.focus && this.state.matches.map(user => (
              <li
                key={user._id}
                style={{
                  cursor: 'pointer',
                  border: '1px solid',
                  listStyleType: 'none',
                }}
                onMouseDown={() => this.props.onClick(user.profile.login, user._id)}
              >
                {user.profile.login}
              </li>
            ))}
          </ul>
        </form>
        {this.state.users.map(user => (
          <p
            key={user._id}
            style={{
              cursor: 'pointer'
            }}
            onClick={() => this.props.onClick(user.profile.login, user._id)}
          >
            {user.profile.login}
          </p>
        ))}
      </div>
    )
  }
}
