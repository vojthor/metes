import autobind from "autobind-decorator";
import React from "react";
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import * as RB from "react-bootstrap";
import {Link} from "react-router";

const {Checkbox, CheckboxGroup, Input, RadioGroup, Row, Select, File, Textarea} = FRC;

export default class ProjectEditForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      eval_data: [],
      rememberMe: true,
      canSubmit: false,
      errors: [],
      edit: false,
    };
  }

  componentDidMount() {
  }

  @autobind
  enableButton() {
    this.setState({canSubmit: true});
  }

  @autobind
  disableButton() {
    this.setState({canSubmit: false});
  }

  render() {
    return (
      <div className="">
        <Formsy.Form className="form-vertical formMetes"
                     onValidSubmit={this.props.submit}
                     onValid={this.enableButton}
                     onInvalid={this.disableButton}>

          <div className="form-group">
            <div className="">
              {this.state.errors}
            </div>
          </div>


          <div className="form-group">
            <Input
              labelClassName={[{'col-sm-3': false}, 'col-xs-12']}
              elementWrapperClassName={[{'col-sm-9': false}, 'col-xs-12 u-text1rem']}
              type="text"
              name="name"
              value={this.props.data.name || ""}
              label={"Jméno projektu"}
              placeholder={"Jméno projektu"}
              required/>
          </div>

          <div className="u-paddingT20px">
                <Textarea
                  labelClassName={[{'col-sm-3': false}, 'col-xs-12']}
                  elementWrapperClassName={[{'col-sm-9': false}, 'col-xs-12 u-text1rem']}
                  rows={5}
                  cols={30}
                  maxLength={1000}
                  name="description"
                  value={this.props.data.description || ""}
                  label={"Popis projektu"}
                  placeholder={"Popis projektu"}
                  required/>
          </div>

          <div className="Grid Grid--multiCol Grid--2col Grid--gutterH5px">
            <div className="Grid-cell">
              {(this.props.data.id) ? <Link className="u-size1of1" to={"/app/projects/edit/" + this.props.data.id + "/values"}>
                <input className="btn btn-primary" type="submit" defaultValue="Upravit kritéria projektu"/>
              </Link> : null }
            </div>
            {this.props.createNew ?
              <div className="u-size1of1 formMetes formMetesButtonWrap">
                  <input className="btn buttonSuccess" type="submit" disabled={!this.state.canSubmit}
                         defaultValue={"Pokračovat na další krok"}/>
              </div>
              :<div className="Grid-cell">
                <input className="btn btn-primary" type="submit" defaultValue="Uložit projekt" disabled={!this.state.canSubmit}/>
              </div>
            }
          </div>

        </Formsy.Form>
      </div >
    )
  }
};
