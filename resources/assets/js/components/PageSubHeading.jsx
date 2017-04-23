import autobind from "autobind-decorator";
import React from "react";
import * as RB from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {trans} from "../utils/i18n.js";
import {Link} from "react-router";


export default class PageSubHeading extends React.Component {

  constructor(props) {
    super();
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="u-paddingB20px">
        <div className={`${this.props.subHeading ? `u-text1_3rem` : `u-text2rem`} u-paddingT20px u-paddingB10px`}>
          {this.props.label}
             {this.props.edited ? <span className="u-weightBold u-paddingL5px">{this.props.edited} </span> : ''}
        </div>
        <div className="Separator Separator--horizontal Separator--codGrayLight"></div>
      </div>
    )
  }
};