import autobind from "autobind-decorator";
import React from "react";
import {Link} from "react-router";
import * as RB from "react-bootstrap";
import Formsy from "formsy-react";
import * as FRC from "formsy-react-components";
import PageSubHeading from "../PageSubHeading.jsx";
import { AuthorizedComponent } from 'react-router-role-authorization';


import {trans} from "../../utils/i18n.js";

//import User from "../../models/User.js";
import Methodology from "../../models/Methodology.js";

export default class MethodologiesEditPage extends React.Component {

  constructor(props) {
    super(props);

    // this.userRoles = [this.props.user.role];
    // this.notAuthorizedPath = '/login';

    this.state = {
      data: {},
      rememberMe: true,
      canSubmit: false,
      errors: [],
    };

  }

  static contextTypes = {
    router: React.PropTypes.object
  };


  @autobind
  submit(model) {
    Methodology
      .edit(model, this.state.data.id)
      .then(response => this.context.router.push("/app/methodologies"))
      .catch(rejection => {
      });
  }

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
      Methodology.getById(this.props.params.id).then(response => {
        this.setState({data: response.methodology});
      })
    }
  }

  render() {

    let errors = this.state.errors;

    if (errors.length) {
      errors = errors.map(function (error, idx) {
        return <RB.Alert bsStyle="danger" key={idx}>{error}</RB.Alert>;
      })
    }

    return (

      <div>
        <div className="Layout-section">
          <PageSubHeading label={(this.props.params.id) ? "Upravit metodiku" : trans("methodologies.add")}/>

          <Formsy.Form className="form-horizontal"
                       onValidSubmit={this.submit}
                       onValid={this.enableButton}
                       onInvalid={this.disableButton}
          >
            <RB.Grid fluid>
              <div className="form-group">
                <div className="col-sm-offset-3 col-sm-9">
                  {errors.length ? errors : ""}
                </div>
              </div>
              <RB.Row>
                <RB.Col xs={6}>
                  <FRC.Input label={trans("common.name")}
                             type="text"
                             name="name"
                             placeholder={trans("common.name")}
                             value={this.state.data.name}
                             autofocus/>
                </RB.Col>
                <RB.Col xs={6}>
                  <FRC.Input label={trans("common.license")}
                             type="text"
                             name="license"
                             placeholder={trans("common.license")}
                             value={this.state.data.licence}
                             autofocus/>
                </RB.Col>
                <RB.Col xs={6}>
                  <FRC.Input label={trans("common.version")}
                             type="text"
                             name="version"
                             placeholder={trans("common.version")}
                             value={this.state.data.version}
                             autofocus/>
                </RB.Col>
                <RB.Col xs={6}>
                  <FRC.Input label={trans("methodologies.certificates")}
                             type="text"
                             name="certificates"
                             placeholder={trans("methodologies.certificates")}
                             value={this.state.data.certificate}
                             autofocus/>
                </RB.Col>
                <RB.Col xs={6}>
                  <FRC.Input label={trans("methodologies.issue_authority")}
                             type="text"
                             name="publisher"
                             placeholder={trans("methodologies.issue_authority")}
                             value={this.state.data.publisher}
                             autofocus/>
                </RB.Col>
                <RB.Col xs={6}>
                  <FRC.Input label={trans("common.language")}
                             type="text"
                             name="language"
                             placeholder={trans("common.language")}
                    //required
                             value={this.state.data.language}
                             autofocus/>
                </RB.Col>
                <RB.Col xs={6}>
                  <FRC.Input label={trans("methodologies.owner")}
                             type="text"
                             name="owner"
                             placeholder={trans("methodologies.owner")}
                             value={this.state.data.owner}
                             autofocus/>
                </RB.Col>
                <RB.Col xs={6}>
                  <FRC.Input label={trans("methodologies.url")}
                             type="text"
                             name="url"
                             placeholder={trans("methodologies.url")}
                             value={this.state.data.url}
                             autofocus/>
                </RB.Col>
              </RB.Row>
              <RB.Row>
                <RB.Col xs={6}>
                  <FRC.Textarea label={trans("common.description")}
                                name="description"
                                placeholder={trans("common.description")}
                                value={this.state.data.description}
                                autofocus/>
                </RB.Col>
                <RB.Col xs={6}>
                  <FRC.Textarea label={trans("common.note")}
                                name="note"
                                placeholder={trans("common.note")}
                                value={this.state.data.note}
                                autofocus/>
                </RB.Col>
              </RB.Row>

              <RB.Row>
                <RB.Col xs={9}>
                  <RB.Button type="submit"
                             bsStyle="primary"
                             bsSize="large"
                             disabled={!this.state.canSubmit}>{(this.props.params.id) ? trans("common.save") : trans("methodologies.add")}</RB.Button>
                </RB.Col>
              </RB.Row>
            </RB.Grid>
          </Formsy.Form>
        </div>
      </div>
    );
  }
}