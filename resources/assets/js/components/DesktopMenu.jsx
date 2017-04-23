import autobind from "autobind-decorator";
import * as React from "react";
import {Navbar, NavDropdown, Nav, NavItem, MenuItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {Link} from "react-router";
import {slide as Menu} from 'react-burger-menu'
import {RoleAwareComponent} from 'react-router-role-authorization';

import {trans} from "../utils/i18n.js";

export default class DesktopMenuComponent extends RoleAwareComponent {
  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.allowedRoles = ['admin'];
    this.userRoles = [this.props.user.role];

    this.state = {
      selectedKey: null,
      menuOpen: false

    };
  }


  navigate(path) {
    this.context.router.push(path);
  }


  @autobind
  setActive(event) {
    event.currentTarget.classList.add("active");
  }

  @autobind
  handleMenuClick(event) {
    this.setState({menuOpen: false});
  }

  outputContextMenu(route) {

    let heading = "Metes",
      subMenu = "";

    // Projekty
    if (/\/app\/projects.*/g.test(route)) {

      const elementStyle = {
        display: "block",
        outline: "none"
      };

      subMenu =
        <nav className="">
          <Link className="menu-item" style={elementStyle} activeClassName={"active"} to="/app/projects">Projekty </Link>
          <Link className="menu-item" style={elementStyle} activeClassName={"active"} to="/app/projects/create">Vytvořit projekt </Link>
          <Link className="menu-item" style={elementStyle} activeClassName={"active"} to="/app/projects/evaluations">Vyhodnocení</Link>
        </nav>;

      heading = "PROJEKTY"

    }

    // Metodiky
    if (/\/app\/methodologies.*/g.test(route)) {

      subMenu =
        <div className="">
          <Link className="menu-item" activeClassName={"active"} to="/app/methodologies">Uložené metodiky </Link>
        </div>;

      heading = "METODIKY"

    }

    // Uživatel
    if (/\/app\/user.*/g.test(route)) {

      subMenu =
        <div>

        </div>;

      heading = "UŽIVATEL"

    }


    return {
      heading,
      subMenu
    };
  }

  render() {

    return (
      <Menu outerContainerId="AppWrapper" className={"MainMenu"} onStateChange={this.lockScroll} pageWrapId="ContentWrapper" isOpen={ this.state.menuOpen }>
        <div className="u-isHidden:45em u-paddingB10px">
          <div className="u-colorWhite u-textDosis u-text2rem mobileMenuSection">
            Stránka {this.outputContextMenu(this.props.route).heading}
          </div>
          <div>{this.outputContextMenu(this.props.route).subMenu}</div>
        </div>
        <div className="u-colorWhite u-textDosis u-text2rem u-isHidden:45em mobileMenuSection">
          Aplikace METES
        </div>
        <Link onClick={ this.handleMenuClick } id="home" className="menu-item" to="/app/projects">Projekty</Link>
        <Link onClick={ this.handleMenuClick } id="about" className="menu-item" to="/app/methodologies">Metodiky</Link>
        <Link onClick={ this.handleMenuClick } id="contact" className="menu-item" to="/app/user">Uživatel</Link>
        {this.rolesMatched() ? <Link onClick={ this.handleMenuClick } className="menu-item" to="/app/admin">Admin</Link> : ``}
        <Link onClick={ this.handleMenuClick } className="menu-item--small" to="/app/logout">Odhlášení</Link>
      </Menu>
    );
  }

}
