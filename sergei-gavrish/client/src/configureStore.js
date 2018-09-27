import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

const initialState = {
  user: {
    tokenId: localStorage.getItem('tokenId') || '',
    expiresIn: localStorage.getItem('expiresIn') || '',
  },
}

const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
);

store.subscribe(() => {
  const { user } = store.getState();
  localStorage.setItem('tokenId', user.tokenId);
  localStorage.setItem('expiresIn', user.expiresIn);
});

export default store;
