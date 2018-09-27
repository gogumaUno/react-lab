import React, { Component } from 'react'
import { connect } from 'react-redux'


class ChatContainer extends Component {

  checkUser = () => {
    const { tokenId, expiresIn } = this.props.user;

    if (expiresIn < Date.now()) alert('Token expired');


  }

  componentDidMount() {

  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(ChatContainer)
