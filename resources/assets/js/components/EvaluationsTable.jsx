import autobind from "autobind-decorator";
import * as React from "react";
import * as RB from "react-bootstrap";
import PageSubHeading from "./PageSubHeading.jsx";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Link} from "react-router";
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table';
import Moment from 'react-moment';
import 'moment/locale/cs';

import {trans} from "../utils/i18n.js";

export default class EvaluationsTable extends React.Component {

  constructor(props) {
    super();
  }

  componentWillUpdate() {
  }

  @autobind
  renderActionButtons(cell, row) {
    return (
      <div>
        <Link className="btn btn-default btn-sm"
              to={"/app/projects/evaluation/" + this.props.data[0].project_id + "/" + row.id}>
          <RB.Glyphicon glyph="info-sign"/>
        </Link>
      </div>
    )
  }

  render() {
    console.log(this.props.data[0]);

    return (
      <div className="Layout-section">
        {this.props.data.length > 0 ? <Table className={"responsiveTable:30em"}>
          <Thead>
          <Tr>

            <Th>Identifikátor</Th>
            <Th>Datum</Th>
            <Th>Akce</Th>
          </Tr>
          </Thead>
          <Tbody>

          {this.props.data.map((evaluation) => {
            return <Tr>
              <Td>{evaluation.id}</Td>
              <Td>
                <Moment format="HH:mm, DD.MM. YYYY">{evaluation.created_at}</Moment>
              </Td>
              <Td>
                <Link
                  className="btn btn-default btn-sm"
                  to={"/app/projects/evaluation/" + this.props.data[0].project_id + "/" + evaluation.id}>
                  <RB.Glyphicon
                    glyph="info-sign"/>
                </Link >
              </Td >
            </Tr>
          })}
          </Tbody>
        </Table> : null
        }
      </div>
    )
  }
}