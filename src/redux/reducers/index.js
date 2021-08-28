import { combineReducers } from 'redux';
import { userReducer } from './userReducer';

const reducer = combineReducers({
  userReducer,
});

export default reducer;
