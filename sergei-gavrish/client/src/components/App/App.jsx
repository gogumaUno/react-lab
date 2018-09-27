import React from 'react';
import { connect, Provider } from 'react-redux';

import AuthContainer from '../../containers/AuthContainer';
import './App.css';

const App = ({ store, user }) => {console.log(user);return (
  <Provider store={store}>
    <div>
      {user.tokenId ? <div>User found</div> : <AuthContainer />}
    </div>
  </Provider>
)};

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps)(App);