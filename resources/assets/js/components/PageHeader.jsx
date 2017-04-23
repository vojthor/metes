import autobind from "autobind-decorator";
import React from "react";
import * as RB from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {trans} from "../utils/i18n.js";
import {Link} from "react-router";


export default class PageHeader extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object,
    location: React.PropTypes.object
  }

  state = {}


  constructor(props) {
    super();
  }


  outputHeading(route) {

    let heading = "Metes",
      subMenu = "";

    // Projekty
    if (/\/app\/projects.*/g.test(route)) {

      subMenu =
        <div className="SubMenu">
          <Link className="" activeClassName={"active"} to="/app/projects"> Projekty </Link>
          <Link className="" activeClassName={"active"} to="/app/projects/create"> Vytvořit projekt </Link>
          <Link className="" activeClassName={"active"} to="/app/projects/evaluations">Vyhodnocení</Link>
        </div>;

      heading = "Projekty"

    }

    // Metodiky
    if (/\/app\/methodologies.*/g.test(route)) {

      subMenu =
        <div className="SubMenu">
          <Link className="" activeClassName={"active"} to="/app/methodologies"> Uložené metodiky </Link>
        </div>;

      heading = "Metodiky"

    }

    // Uživatel
    if (/\/app\/user.*/g.test(route)) {

      subMenu =
        <div>

        </div>;

      heading = "Uživatel"

    }

    // Registrace
    if (/register.*/g.test(route)) {

      subMenu =
        <div>

        </div>;

      heading = "Registrace"

    }

    // Registrace
    if (/login.*/g.test(route)) {

      subMenu =
        <div>

        </div>;

      heading = "Přihlášení"

    }

    return {
      heading,
      subMenu
    };
  }

  render() {

    const pageInfo = this.outputHeading(this.props.route);
    const pageSubHeadingRight = <div className="PageHeading-menuString--right u-textDosis">
      <span className="u-colorMetes ">METES</span>
      <span className="u-colorWhite">{`|${pageInfo.heading}`}</span>
    </div>;


    return (
      <div id="PageHeader" className="u-bgCodGray">
        <div className="u-maxWidth1600 u-centerizeHorizontally">
          <div className="Arrange u-paddingV10px u-isHidden:0-45em">
            <div className="Arrange-sizeFit">
              <div className="u-isHidden:50em u-paddingL40px">&nbsp;</div>
              <div className="u-colorWhite u-textDosis u-centerizeVertically PageHeading-menuString u-isHidden u-isShown:50em">
                {this.props.user.name ? "< MENU" : ""}
                |<span className="u-isHidden u-isShown:60em u-colorMetes">METES</span>
                <span className="u-isHidden u-isShown:60em">{`|${pageInfo.heading}`}</span>
              </div>
            </div>
            <div className="Arrange-sizeFill">
              <div className="u-textCenter u-textDosis u-centerizeVertically">
                {pageInfo.subMenu}
              </div>
            </div>
            <div className="Arrange-sizeFit">
              <div className="u-centerizeVertically u-colorWhite u-paddingR20px">
                {this.props.user.name ? <div className="Arrange u-isHidden u-isShown:70em">
                  <div className="Arrange-sizeFill Arrange-right u-paddingH10px u-textDosis u-text1rem">
                    <div>{`${this.props.user.name} ${this.props.user.surname}`}</div>
                    <div>{this.props.user.email}</div>
                  </div>
                  <div className="Arrange-sizeFit">
                    <Link to="/app/user">
                      <span className="glyphicon glyphicon-user extraLargeGlyphicon u-colorMetes"/>
                    </Link>
                  </div>
                </div> : null}
                <div className="u-isHidden:60em">
                  {pageSubHeadingRight}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="u-isHidden:45em u-paddingV20px u-textRight u-paddingR10px">
          {pageSubHeadingRight}
        </div>
      </div>
    )
  }
};