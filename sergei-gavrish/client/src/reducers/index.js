import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import {userReducer} from './userReducer';
import {messagesReducer} from './messagesReducer';

const rootReducer = combineReducers({
  user: userReducer,
  messages: messagesReducer,
  form: formReducer,
});

export default rootReducer;
