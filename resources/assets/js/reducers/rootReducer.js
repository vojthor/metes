import { combineReducers } from 'redux';
import projects from './projectReducer';
import user from './userReducer';
import { routerReducer } from 'react-router-redux'
export default combineReducers({
  projects,
  user,
  routing: routerReducer
});