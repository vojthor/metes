import autobind from "autobind-decorator";
import React from "react";
import {Link} from "react-router";
import * as RB from "react-bootstrap";
import Formsy from "formsy-react";
import * as FRC from "formsy-react-components";

import {trans} from "../../utils/i18n.js";
import Criteria from "../../models/Criteria.js";

export default class CriteriaEditPage extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    state = {
        errors: [],
        data: [],
    };


    @autobind
    enableButton() {
        this.setState({canSubmit: true});
    }

    @autobind
    disableButton() {
        this.setState({canSubmit: false});
    }

    @autobind
    componentDidMount() {
        if (this.props.params.id != undefined) {
            Criteria.getById(this.props.params.id).then(response => {
                this.setState({data: response.criterion});
            })
        }
    }

    render() {

        var selectTrueFalse = [
            {value: '1', label: 'Ano'},
            {value: '0', label: 'Ne'}
        ];

        return (

            <RB.Panel bsStyle="primary" header={trans("criteria.detail")}>


                <Formsy.Form className="form-horizontal"
                             onValidSubmit={this.submit}
                             onValid={this.enableButton}
                             onInvalid={this.disableButton}>
                    <RB.Grid fluid>

                        <RB.Row>
                            <RB.Col xs={6}>
                                <FRC.Input label={trans("common.name")}
                                           type="text"
                                           name="name"
                                           placeholder={trans("common.name")}
                                           autofocus
                                           value= {this.state.data.name}
                                           disabled/>
                            </RB.Col>
                            <RB.Col xs={6}>
                                <FRC.Textarea label={trans("common.description")}
                                              name="description"
                                              placeholder={trans("common.description")}
                                              autofocus
                                              value= {this.state.data.description}
                                              disabled/>
                            </RB.Col>

                            <RB.Col xs={6}>
                                <FRC.Input
                                    type="text"
                                    name="criteria_group"
                                    label={trans("criteria.criteria_group")}
                                    value={this.state.data.group_name}
                                    required
                                    disabled
                                />
                            </RB.Col>
                            <RB.Col xs={6}>
                                <FRC.Textarea label={trans("criteria.rating_scale")}
                                              name="rating_scale"
                                              placeholder={trans("criteria.rating_scale")}
                                              autofocus
                                              value= {this.state.data.scale}
                                              disabled/>
                            </RB.Col>
                            <RB.Col xs={6}>
                                <FRC.Textarea label={trans("criteria.meaning")}
                                              name="rating_scale"
                                              placeholder={trans("criteria.meaning")}
                                              autofocus
                                              value= {this.state.data.meaning}
                                              disabled/>
                            </RB.Col>
                            <RB.Col xs={6}>
                                <FRC.Input label={trans("criteria.weight")}
                                           type="text"
                                           name="certificates"
                                           placeholder={trans("criteria.weight")}
                                           autofocus
                                           value= {this.state.data.weight}
                                           disabled/>
                            </RB.Col>
                            <RB.Col xs={6}>
                                <FRC.Select
                                    name="is_key"
                                    label={trans("criteria.is_key")}
                                    options={selectTrueFalse}
                                    required
                                    value= {this.state.data.is_key}
                                    disabled
                                />
                            </RB.Col>

                        </RB.Row>

                        <RB.Row>
                        </RB.Row>
                    </RB.Grid>
                </Formsy.Form>
            </RB.Panel>
        );
    }
}