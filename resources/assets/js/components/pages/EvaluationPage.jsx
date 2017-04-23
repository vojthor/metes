import autobind from "autobind-decorator";
import React from "react";
import Project from "../../models/Project.js";
import Evulation from "../../models/Evulation.js";
import EvaluationComponent from "../EvaluationComponent.jsx";
import PageSubHeading from "../PageSubHeading.jsx";
import EvaluationsTable from "../EvaluationsTable.jsx";
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table';
import {Link} from "react-router";
import * as RB from "react-bootstrap";
import Moment from 'react-moment';
import 'moment/locale/cs';

export default class EvaluationPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      projects: {},
      evaluations: {},
      evaluationData: {},
      evaluationProjectsData: {},
    };
  }

  componentDidMount() {
    this.loadProjects();
    if (this.props.params.id && this.props.params.eval_id) {
      this.loadEvaluation();
    } else if (this.props.params.id) {
      Evulation.getAll(this.props.user.id, this.props.params.id).then(response => {
        this.setState({evaluations: response.evaluations});
      });
    }
  }

  @autobind
  renderActionButtons() {
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
    let evalComponent = null;
    if ((Object.keys(this.state.evaluationProjectsData).length !== 0)) {

      evalComponent =
        <div>
          { this.state.evaluationProjectsData.map((project) => {
            if (project.length > 0) {
              return (
                <div>
                  <PageSubHeading subHeader={true} label={project[0].name}/>
                  <Table className={"responsiveTable:30em"}>
                    <Thead>
                    <Tr>
                      <Th>Metodika</Th>
                      <Th>Typ</Th>
                      <Th>Datum</Th>
                      <Th>Detail</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    { project.map((projectEval) => {
                      {
                        return projectEval.methodology_project_evaluation.map((evaluation) => { //Evals loop
                          if (evaluation.type === "Doporučená metodika") {
                            return <Tr>
                              <Td>{evaluation.methodology_model.name}</Td>
                              <Td>{evaluation.type}</Td>
                              <Td>{projectEval.updated_at}</Td>
                              <Td>
                                <Link className="btn btn-default btn-sm"
                                      to={"/app/projects/evaluation/" + project[0].project_id + "/" + projectEval.id}>
                                  <RB.Glyphicon glyph="info-sign"/>
                                </Link>
                              </Td>
                            </Tr>
                          }
                        })
                      }
                    })}

                    </Tbody>
                  </Table>
                </div>
              )
            }
          })
          }
        </div>
    }

    return (
      <div className="Layout-section">
        {(Object.keys(this.state.evaluationData).length !== 0) ? <EvaluationComponent data={this.state.evaluationData}/> : '' }
        {(Object.keys(this.state.evaluations).length !== 0) ? <EvaluationsTable data={this.state.evaluations}/> : '' }
        {evalComponent ? evalComponent : null}
      </div>
    )
  }

  @autobind
  loadProjects() {
    Project.getAll(this.props.user.id).then((response) => {
      this.setState({projects: response.projects})
    });
  }

  @autobind
  loadEvaluation() {
    Evulation.getDetail(this.props.user.id, this.props.params.id, this.props.params.eval_id).then((response) => {
      this.setState({evaluationData: response});
    });
  }
};
