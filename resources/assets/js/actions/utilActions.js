import User from "../models/User.js"

export function currentUser(route) {
  return {type: "SAVE_ROUTE", route};
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

export function saveRoute() {
  return function (dispatch) {
    return User.login().then(response => {
      (response.user) ? dispatch(currentUser(response.user)) : null;
      // dispatch({type: "LOAD_PROJECTS_SUCCESS"});
    }).catch(error => {
      throw(error);
    });
  };
}