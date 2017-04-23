import autobind from "autobind-decorator";
import React from "react";
import {Link} from "react-router";
import * as RB from "react-bootstrap";
import Formsy from "formsy-react";
import * as FRC from "formsy-react-components";


import {trans} from "../../utils/i18n.js";

import User from "../../models/User.js";

export default class DashboardPage extends React.Component {
  render() {
    return (
      <div>{JSON.stringify(this.props.user)}</div>
    );
  }
}