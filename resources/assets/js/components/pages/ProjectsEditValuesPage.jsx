import autobind from "autobind-decorator";
import React from "react";
import * as RB from "react-bootstrap";
import Formsy from "formsy-react";
import * as FRC from "formsy-react-components";
import {trans} from "../../utils/i18n.js";
import {Link} from "react-router";
import PageSubHeading from "../PageSubHeading.jsx";


import Project from "../../models/Project.js";

export default class ProjectsEditValuesPage extends React.Component {

  constructor(props) {
    super();
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

  state = {
    data: {},
    rememberMe: true,
    canSubmit: false,
    errors: [],
    values: {},

  };

  @autobind
  submit(model) {
    Project.setCriteriaValues(this.props.user.id, this.props.params.id, model)
      .then(response => this.context.router.push("/app/projects/edit/" + this.props.params.id))
      .catch(rejection => {
        this.setState({errors: rejection.errors});
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
      this.setState({edit: true})
      Project.getCriteriaValues(this.props.user.id, this.props.params.id).then(response => {
        this.setState({data: response.project_values});
      });
    }
  }

  handleValuesChange(component, values) {
    this.setState({
      values: values,
    });
  }

  handleChange(value) {
    this.setState({
      value: value
    });
  }

  render() {

    let errors = this.state.errors;

    if (errors.length) {
      errors = errors.map(function (error, idx) {
        return <RB.Alert bsStyle="danger" key={idx}>{error}</RB.Alert>;
      })
    }

    // Criteria groups
    var groups = [];
    for (let group in this.state.data) {
      // skip loop if the property is from prototype
      if (!this.state.data.hasOwnProperty(group)) continue;

      let groupValues = [];

      // Values in group - generating inputs
      let keyValues = 0;
      for (let value in this.state.data[group]) {
        if (!this.state.data[group].hasOwnProperty(value)) continue;
        const helpText = this.state.data[group][value].criterion.scale.split(/\n/);
        const helpButton =
          <div className="">
            <a className="button" href={`#crit_id${this.state.data[group][value].criterion.id}`}>
              <span className="glyphicon glyphicon-question-sign"></span>
            </a>
            <div id={`crit_id${this.state.data[group][value].criterion.id}`} className="overlay">
              <div className="popup">
                <span className="u-text2rem lightboxHeadline">{this.state.data[group][value].criterion_name}</span>
                <a className="close" href="#">&times;</a>
                <div className="padding40px">
                  <div className="u-text1_3rem u-paddingV10px u-textLeft">{this.state.data[group][value].criterion.description}</div>
                  <div className="u-text1_3rem u-paddingV10px u-textLeft">{this.state.data[group][value].criterion.meaning}</div>
                  {helpText.map((text) => {
                      const obj = text.split(":");
                      return (
                        <div className="u-text1_3rem u-paddingV10px u-textLeft">
                          <span className="u-weightBold">{obj[0]}: </span>
                          {obj[1]}
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>;

        var tmp_scale = this.state.data[group][value].criterion.scale.split("\n");
        if (tmp_scale.length == 1) {
          tmp_scale = this.state.data[group][value].criterion.scale.split(";");
        }

        var scale = tmp_scale.map(function (entry) {
          if (!isNaN(entry.split(":")[0]))
            return entry.split(":")[0];
          else return false;
        });

        groupValues.push(
          <div className="Grid-cell" key={keyValues}>
            <FRC.Input label={this.state.data[group][value].criterion_name}
                       type="number"
                       name={this.state.data[group][value].criterion_id + ''}

                       value={parseInt(this.state.data[group][value].value)}
                       min={Math.min.apply(Math, scale)}
                       max={Math.max.apply(Math, scale)}
                       addonAfter={helpButton}
                       // addonAfter={box}
            />
          </div>
        )
        keyValues++;
      }

      // Section for each criteria group
      const labelText = (this.state.data[group][0].group_id === 3 || this.state.data[group][0].group_id === 4 )
        ? this.state.data[group][0].group_name
        : <span className="u-size1of1 u-flexOne">
            <div className="Arrange">
              <span className="Arrange-sizeFit">{this.state.data[group][0].group_name}</span>
              <span className="u-text13px u-textItalic u-textRight u-sendBottom Arrange-sizeFill u-paddingR5px">
                {trans(`evaluation.not_calculated`)}
              </span>
            </div>
          </span>

      groups.push(
        <div className="Grid-cell">
          <PageSubHeading label={labelText} subHeading={true}/>
          <div className="Grid Grid--1col">
            {groupValues}
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className="Layout-section">
          <PageSubHeading label={"Hodnoty kritérií projektu"}/>
          <Formsy.Form className="form-horizontal formMetesx"
                       onValidSubmit={this.submit}
                       onValid={this.enableButton}
                       onInvalid={this.disableButton}>

            <div className="form-group">
              <div className="col-sm-offset-3 col-sm-9">
                {errors.length ? errors : ""}
              </div>
            </div>
            <div className="Grid Grid--1col Grid--multiCol:60em Grid--2col:60em Grid--4col:85em Grid--wrap Grid--gutterH40px">
              {groups}
            </div>
            <div className="u-paddingV20px Arrange">
              <div className="Arrange-sizeFill"></div>
              <div className="Arrange-sizeFit">
                <RB.Button type="submit"
                           bsStyle="success"
                           disabled={!this.state.canSubmit}>{trans("projects.save_criteria_values")}
                </RB.Button>
              </div>
            </div>
          </Formsy.Form>
        </div>
      </div>
    );
  }
}

{/*<div id="content">*/}
  {/*<a href="#image1" className="wiggle">Click</a>*/}
  {/*<div class="lightbox short-animate" id="image1">*/}
    {/*<div className="ong-animate">*/}
      {/*Cunt tent*/}
    {/*</div>*/}
  {/*</div>*/}
  {/*<div id="lightbox-controls" class="short-animate">*/}
    {/*<a id="close-lightbox" class="long-animate" href="#!">Close Lightbox</a>*/}
  {/*</div>*/}
{/*</div>*/}