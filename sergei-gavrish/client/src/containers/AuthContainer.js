import React, { Component, Fragment } from 'react';
import LoginPage from '../components/LoginPage';
import { connect } from 'react-redux';
import * as userActions from '../actions/userActions';

class AuthContainer extends Component {
  
  submit = values => {
    fetch(`http://localhost:8080/api/users/login`, {
      method: 'POST',
      body: JSON.stringify({
        login: values.login,
        password: values.password,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(result => this.props.userLogin(result))
  }

  render() {
    return (
      <Fragment>
        <LoginPage onSubmit={this.submit} />
      </Fragment>
    )
  }
}

function mapStateToProps(state, ownProps){
  return { user: state.user }
}

function mapDispatchToProps(dispatch){
 return { 
  userLogin: (user) => {
    dispatch(userActions.userLogin(user))
  }
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)