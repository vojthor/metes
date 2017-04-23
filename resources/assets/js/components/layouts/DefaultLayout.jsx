import {bem} from "../../utils/helpers";
import * as React from "react";
import {Navbar, NavDropdown, Nav, NavItem, MenuItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

import {trans} from "../../utils/i18n.js";

import DesktopMenu from "../DesktopMenu.jsx";
import PageHeader from "../PageHeader.jsx";
import PageFooter from "../PageFooter.jsx";

import {connect} from 'react-redux';

class DefaultLayout extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  state = {
    selectedKey: null,
    route: ""
  };

  navigate(path) {
    this.context.router.push(path);
  }

  render() {
    return (
      <div id="AppWrapper" className="u-flex u-flexColumn">
        <DesktopMenu route={this.props.route} user={this.props.user}/>
        <PageHeader route={this.props.route} user={this.props.user}/>
        <div className="u-flexOne u-flex u-flexColumn">
          <div id="ContentWrapper" className={bem("u-centerizeHorizontally u-maxWidth1600 u-flexOne")}>
            <div className="Content">
              {React.cloneElement(this.props.children, this.props)}
            </div>
          </div>
        </div>
        <PageFooter/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    route: ownProps.location.pathname
  };
}

export default connect(mapStateToProps)(DefaultLayout);