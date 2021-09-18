import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { historyReducer } from './historyReducer';
import { roomActiveReducer } from './roomActiveReducer';
import { loadingReducer } from './loadingReducer';

const reducer = combineReducers({
  userReducer,
  historyReducer,
  roomActiveReducer,
  loadingReducer,
});

export default reducer;
