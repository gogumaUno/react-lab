import React from 'react';
import { connect, Provider } from 'react-redux';

import AuthContainer from '../../containers/AuthContainer';
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