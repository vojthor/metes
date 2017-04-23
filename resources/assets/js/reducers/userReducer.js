import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
  switch(action.type) {
    case "CURRENT_USER":
      return Object.assign([], state, action.user);
    case "USER_LOGGED_IN":
      return Object.assign([], state, action.user);
    default:
      return state;
  }
}