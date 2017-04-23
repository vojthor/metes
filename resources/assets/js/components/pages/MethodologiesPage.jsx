import {bem} from "../../utils/helpers";
import autobind from "autobind-decorator";
import React from "react";
import {Link} from "react-router";
import * as RB from "react-bootstrap";
import Methodology from "../../models/Methodology.js";
import PageSubHeading from "../PageSubHeading.jsx";
import MethodologyPanel from "../MethodologyPanel.jsx";
import { RoleAwareComponent } from 'react-router-role-authorization';


export default class MethodologiesPage extends RoleAwareComponent {


  constructor() {
    super();
    this.state = {data: []};
  }

  @autobind
  getMethodologies() {
    Methodology.getAll().then((response) => {
      this.setState({data: response.methodologies});
    });
  }

  @autobind
  componentDidMount() {
    this.getMethodologies();
  }

  @autobind
  renderActionButtons(cell, row) {
    return (
      <div>
        <Link className="btn btn-default btn-sm" to={"/app/methodologies/info/" + row.id}>
          <RB.Glyphicon glyph="info-sign"/>
        </Link>
      </div>
    )
  }

  @autobind
  handleRemove(id) {
  }

  render() {

    return (
      <div>
        <div className="Layout-section">
          <PageSubHeading label="Uložené metodiky"/>

          <div className={`${bem("")}`}>
            {this.state.data.map((methodologyData, i) =>
              <MethodologyPanel user={this.props.user} className={""} key={i} methodology={methodologyData}/>
            )}
          </div>
        </div>
      </div>
    );


  }


}
