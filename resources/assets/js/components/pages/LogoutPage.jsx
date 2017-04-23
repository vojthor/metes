import React from "react";

import User from "../../models/User.js";

export default class LogoutPage extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  componentWillMount() {
    User
      .logout()
        .then(response => document.location = "/login")
  }

  render() {
    return (
      <div>Logging out...</div>
    );
  }
}