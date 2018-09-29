import React from 'react';
import { connect, Provider } from 'react-redux';

import AuthContainer from '../../containers/AuthContainer';
import ChatContainer from '../../containers/ChatContainer';
import AppContent from '../../containers/AppContent';
import './App.css';

const App = ({ store, user }) => (
  <Provider store={store}>
    <div>
      {user.token ? <AppContent /> : <AuthContainer />}
    </div>
  </Provider>
);

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps)(App);