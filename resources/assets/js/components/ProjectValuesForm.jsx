import {bem} from "../utils/helpers";
import autobind from "autobind-decorator";
import React from "react";
import * as RB from "react-bootstrap";
import Formsy from "formsy-react";
import * as FRC from "formsy-react-components";
import {trans} from "../utils/i18n.js";
import PageSubHeading from "./PageSubHeading.jsx";
import Criteria from "../models/Criteria";
import ReactTooltip from 'react-tooltip'

export default class projectValuesForm extends React.Component {

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
    isEdit: false,

  };

  @autobind
  submitData(model) {
    this.props.saveDataAction(model);
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
    if (this.props.params !== undefined) {
      if (this.props.props.id !== undefined) {
        this.setState({edit: true});
        this.setState({isEdit: true});
        Project.getCriteriaValues(this.props.user.id, this.props.props.id).then(response => {
          this.setState({data: response.project_values});
        });
      }
    } else {
      this.setState({edit: true})
      Criteria.getAllEmpty().then(response => {

        const parsedData = [];

        for (let group in response.project_values) {

          let innerData = [];

          response.project_values[group].map((groupData) => {

            innerData.push({
              criterion_id: groupData.id,
              criterion_name: groupData.criterion_name,
              group_id: groupData.group_id,
              group_name: groupData.group_name,
              weight: groupData.weight,
              value: 0,
              criterion: groupData
            });
          });

          parsedData.push([innerData]);
        }
        ;

        let parsedData2 = [];

        parsedData.map((data) => {
          parsedData2.push(data[0]);
        });

        (!this.state.isEdit) ? this.setState({data: parsedData2}) : null;
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
    let groups = [];
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
                       labelClassName={[{'col-sm-3': false}, 'col-xs-12 u-textCenter u-colorWhite']}
                       elementWrapperClassName={[{'col-sm-9': false}, 'col-xs-12 u-text1rem u-colorWhite']}
                       value={parseInt(this.state.data[group][value].value)}
                       min={Math.min.apply(Math, scale)}
                       max={Math.max.apply(Math, scale)}
                       addonAfter={helpButton}
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
              <span className="u-text16px u-textItalic u-textRight u-sendBottom Arrange-sizeFill u-paddingR5px">
                {trans(`evaluation.not_calculated`)}
              </span>
            </div>
          </span>

      if (this.props.keyOnly) {

        if (this.state.data[group][0].group_id === 3 || this.state.data[group][0].group_id === 4) {

          groups.push(
            <div className="Grid-cell" key={group}>
              <div className="u-paddingH10px u-textDosis u-text2rem u-paddingB10px u-colorWhite">{labelText}</div>
              <div className="Grid Grid--1col">
                {groupValues}
              </div>
            </div>
          )
        }
      } else {
        groups.push(
          <div className="Grid-cell" key={group}>
            <div className="u-paddingH10px u-textDosis u-text2rem u-paddingB10px u-colorWhite">{labelText}</div>
            <div className="Grid Grid--1col">
              {groupValues}
            </div>
          </div>
        )
      }
    }

    return (
      <div>
        <Formsy.Form className="form-horizontal u-maxWidth960 u-centerizeHorizontally"
                     onValidSubmit={this.submitData}
                     onValid={this.enableButton}
                     onInvalid={this.disableButton}>

          <div className="form-group">
            <div className="col-sm-offset-3 col-sm-9">
              {errors.length ? errors : ""}
            </div>
          </div>
          <div className={bem("Grid/1col/2col:40em/multiCol:40em/wrap")}>
            {groups}
          </div>
          <div className="Grid Grid--multiCol Grid--2col">
            <div className="Grid-cell">
            </div>
            <div className="Grid-cell">
              {this.props.createNew ?
                <div className="u-size1of1 formMetes formMetesButtonWrap">
                  <input className="btn buttonSuccess" type="submit" disabled={!this.state.canSubmit}
                         defaultValue={"Pokračovat na další krok"}/>
                </div>
                : <div className="u-sendRight formMetes">
                  < input className="btn btn-primary" type="submit" defaultValue="Uložit hodnoty kritérií"/>
                </div>
              }

            </div>
          </div>
        </Formsy.Form>
      </div>
    );
  }
};