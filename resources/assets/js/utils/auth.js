import User from "../models/User.js";

export function redirectIfAuthenticated(nextState, replace, doneCb) {
  User
    .current()
    .then(function(response) {
      if (!!response.user) {
        replace({
          pathname: '/app',
        });
      }

      doneCb();
    });
}

export function redirectIfNotAuthenticated(nextState, replace, doneCb) {
  User
    .current()
    .then(function(response) {
      if (!response.user) {
        replace({
          pathname: '/login',
          state: {
            nextPathname: nextState.location.pathname
          },
        });
      }

      doneCb();
    });
}