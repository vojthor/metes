import autobind from "autobind-decorator";
import React from "react";
import * as RB from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {trans} from "../utils/i18n.js";
import {Link} from "react-router";


export default class PageFooter extends React.Component {

  constructor(props) {
    super();
  }

  componentDidMount() {

  }

  render() {
    return (
      <div id="PageFooter" className="u-paddingH10px u-paddingT10px u-paddingB10px u-bgCodGray u-textCenter u-text1rem u-colorWhite Footer Arrange u-sendBottom">
        <div className="u-centerizeHorizontally u-maxWidth1200 u-bgCodGray">
          <p>Tato webová aplikace vznikla jako praktická část diplomové práce <i>Vývoj moderních webových aplikací</i>.</p>
          <p>Vytvořil Vojtěch Nezdara, 2017,
            <span className=""> &#118;&#111;&#106;&#116;&#101;&#099;&#104;&#046;&#110;&#101;&#122;&#100;&#097;&#114;&#097;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;
            </span>
          </p>
        </div>
      </div>
    )
  }
};