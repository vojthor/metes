import autobind from "autobind-decorator";
import React from "react";
import * as RB from "react-bootstrap";
import {trans} from "../../utils/i18n.js";
import {Link} from "react-router";
import PageSubHeading from "../PageSubHeading.jsx";
import EvaluationsTable from "../EvaluationsTable.jsx";
import Project from "../../models/Project.js";
import Evulation from "../../models/Evulation.js";
import ProjectEditForm from "../ProjectEditForm.jsx";
import {connect} from 'react-redux';


class ProjectsEditPage extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props) {
    super();

    this.state = {
      data: {},
      eval_data: [],
      rememberMe: true,
      canSubmit: false,
      errors: [],
      edit: false,
    };

  }

  @autobind
  submit(model) {
    if (this.props.params.id != undefined) {
      // Update
      Project
        .update(this.props.user.id, this.props.params.id, model)
        .then(response => this.context.router.push("/app/projects"))
        .catch(rejection => {
          this.setState({errors: rejection.errors});
        });
    } else {
      // Create
      Project
        .create(this.props.user.id, model)
        .then(response => this.context.router.push("/app/projects"))
        .catch(rejection => {
          this.setState({errors: rejection.errors});
        });

    }
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
      Project.getById(this.props.user.id, this.props.params.id).then(response => {
        this.setState({data: response.project});
      }).catch(response => {
        this.context.router.push("/app/projects")
      });
      Evulation.getAll(this.props.user.id, this.props.params.id).then(response => {
        this.setState({eval_data: response.evaluations});
      })
    }
  }

  @autobind
  renderActionButtons(cell, row) {
    return (
      <div>
        <Link className="btn btn-default btn-sm"
              to={"/app/projects/evaluation/" + this.props.params.id + "/" + row.id}>
          <RB.Glyphicon glyph="info-sign"/>
        </Link>
      </div>
    )
  }

  @autobind
  handleEvulation() {
    Evulation.evulation(this.props.user.id, this.props.params.id).then(response => {
      this.context.router.push("/app/projects/evaluation/" + this.props.params.id + "/" + response.id_eva);
    });
  }

  render() {

    let errors = this.state.errors || [];

    if (errors.length) {
      errors = errors.map(function (error, idx) {
        return <RB.Alert bsStyle="danger" key={idx}>{error}</RB.Alert>;
      })
    }

    return (

      <div className="">
        <div className="Layout-section">
          <PageSubHeading label={this.state.edit ? trans("projects.edit") : trans("projects.new")} edited={this.state.edit ? this.state.data.name : ''}/>
          <ProjectEditForm data={this.state.data} edit={this.state.edit} submit={this.submit}/>
        </div>

        {
          this.state.edit ?
            <div className="Layout-section">
              <div className="u-paddingH10px">
                <PageSubHeading label={trans("projects.eval_results")}/></div>
              <div className="Grid Grid--multiCol Grid--3col Grid--justifyRight u-paddingB5px u-paddingH10px">
                <div className="Grid-cell u-size1of4:60em">
                  <RB.Button className="btn btn-info" onClick={() => {
                    this.handleEvulation()
                  }}>
                    {trans("projects.edit_evaluation")}
                  </RB.Button>
                </div>
              </div>
              <EvaluationsTable data={this.state.eval_data}/>
            </div> : <div className="Layout-section"></div>
        }


      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
  };
}


export default connect(mapStateToProps)(ProjectsEditPage);