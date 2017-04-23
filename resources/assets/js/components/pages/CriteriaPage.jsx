import autobind from "autobind-decorator";
import React from "react";
import {Link} from "react-router";
import * as RB from "react-bootstrap";
import Formsy from "formsy-react";
import * as FRC from "formsy-react-components";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';  // in ECMAScript 6
import {trans} from "../../utils/i18n.js";
import Criteria from "../../models/Criteria.js";

export default class CriteriaPage extends React.Component {


    constructor() {
        super();
        this.state = {data: []};
    }

    @autobind
    getCriteria() {
        Criteria.getAll().then((response) => {
            this.setState({data: response.criteria});
        });
    }

    @autobind
    componentDidMount() {
        this.getCriteria();
    }

    @autobind
    renderActionButtons(cell, row) {
        return(
            <div>
                <Link className="btn btn-default btn-sm" to={"/app/criteria/edit/" + row.id}>
                    <RB.Glyphicon glyph="info-sign" />
                </Link>
            </div>
        )
    }

    @autobind
    handleRemove(id) {

    }

    render() {
        return (
            <RB.Panel bsStyle="primary" header={trans("nav.criteria")}>

                <BootstrapTable data={this.state.data} search={true} pagination={true}>
                    <TableHeaderColumn dataField="name" isKey={true}>{trans("common.name")}</TableHeaderColumn>
                    <TableHeaderColumn dataField="group_name">{trans("criteria.criteria_group")}</TableHeaderColumn>
                    <TableHeaderColumn columnClassName="colWrap" dataField="description">{trans("common.description")}</TableHeaderColumn>
                    <TableHeaderColumn dataFormat={ this.renderActionButtons }>{trans("common.action")}</TableHeaderColumn>
                </BootstrapTable>

            </RB.Panel>
        );
    }
}
