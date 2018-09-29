import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

const initialState = {
  user: {
    token: localStorage.getItem('token') || '',
    expiresIn: localStorage.getItem('expiresIn') || '',
    _id: localStorage.getItem('_id') || '',
    login: localStorage.getItem('login') || '',
  },
}

const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
);

store.subscribe(() => {
  const { token, expiresIn, _id, login } = store.getState().user;
  localStorage.setItem('token', token);
  localStorage.setItem('expiresIn', expiresIn);
  localStorage.setItem('_id', _id);
  localStorage.setItem('login', login);
});

export default store;
