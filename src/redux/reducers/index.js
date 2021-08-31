import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { historyReducer } from './historyReducer';
import { roomActiveReducer } from './roomActiveReducer';

const reducer = combineReducers({
  userReducer,
  historyReducer,
  roomActiveReducer,
});

export default reducer;
