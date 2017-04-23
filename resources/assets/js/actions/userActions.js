import User from "../models/User.js"

export function currentUser(user) {
  return {type: "CURRENT_USER", user};
}

export function userLoggedIn(user) {
  return {type: "USER_LOGGED_IN", user};
}

export function getCurrentUser() {
  return function (dispatch) {
    return User.current().then(response => {
      (response.user) ? dispatch(currentUser(response.user)) : null;
    }).catch(error => {
      throw(error);
    });
  };
}

export function userLogin() {
  return function (dispatch) {
    return User.login().then(response => {
      (response.user) ? dispatch(currentUser(response.user)) : null;
      // dispatch({type: "LOAD_PROJECTS_SUCCESS"});
    }).catch(error => {
      throw(error);
    });
  };
}