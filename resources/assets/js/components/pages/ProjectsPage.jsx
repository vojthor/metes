import autobind from "autobind-decorator";
import React, {PropTypes} from 'react';
import * as RB from "react-bootstrap";
import Project from "../../models/Project.js"
import {trans} from "../../utils/i18n.js";
import {Link} from "react-router";
import {connect} from 'react-redux';
import PageSubHeading from "../PageSubHeading.jsx";
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table';
import Moment from 'react-moment';
import 'moment/locale/cs';
import SweetAlert from 'sweetalert-react';

class ProjectsPage extends React.Component {

  state = {
    projects: [],
    removeDialogShow: false
  };

  constructor(props, context) {
    super(props, context);
  }

  @autobind
  componentDidMount() {
    (this.props.user.id) ? this.loadProjects() : null;
  }

  @autobind
  renderActionButtons(id) {
    return (
      <div>
        <Link className="btn btn-default btn-sm" to={"/app/projects/edit/" + id}>
          <RB.Glyphicon glyph="cog"/>
        </Link>
        <RB.Button onClick={() => this.handleRemove(id)} bsSize="small">
          <RB.Glyphicon glyph="trash"/>
        </RB.Button>
        <SweetAlert
          show={this.state.removeDialogShow}
          title= "Jeste si jistí?"
          text= "Opravdu chcete odstranit tento projekt?"
          type= "warning"
          showCancelButton= {true}
          confirmButtonColor= "#DD6B55"
          confirmButtonText= "Ano, smazat."
          cancelButtonText= "Ne, zrušit."
          onConfirm={() =>

            Project.remove(this.props.user.id, id).then((response) => {
              this.setState({removeDialogShow: false})
              this.loadProjects();
            })

          }
          onCancel={() => this.setState({removeDialogShow: false})}
        />
      </div>
    )
  }

  @autobind
  loadProjects() {
    Project.getAll(this.props.user.id).then(response => {
      this.setState({projects: response.projects});
    }).catch(error => {
      throw(error);
    });
  }

  @autobind
  handleRemove(id) {
    this.setState({removeDialogShow: true});
  }

  render() {

    const projects = this.props.projects || [];
    const TextCell = ({rowIndex, data, col, ...props}) => (
      <Cell {...props}>
        {data.getObjectAt(rowIndex)[col]}
      </Cell>
    );

    return (
      <div>

        <div className="Layout-section">
          <PageSubHeading label="Projekty"/>
          <Table className={"responsiveTable:30em"}>
            <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Název</Th>
              <Th>Popis</Th>
              <Th>Poslední změna</Th>
              <Th>Akce</Th>
            </Tr>
            </Thead>
            <Tbody>
            {this.state.projects.map((project, i) =>
              <Tr key={i}>
                <Td>{project.id}</Td>
                <Td>{project.name}</Td>
                <Td>{project.description}</Td>
                <Td> <Moment format="HH:mm, DD.MM. YYYY">{project.updated_at}</Moment></Td>
                <Td>{ this.renderActionButtons(project.id) }</Td>
              </Tr>
            )}
            </Tbody>
          </Table>
        </div>
      </div>
    )
  }

}
;

ProjectsPage.propTypes = {
  projects: PropTypes.array.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(ProjectsPage);