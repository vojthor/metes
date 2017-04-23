import autobind from "autobind-decorator";
import React from 'react';
import {AuthorizedComponent} from 'react-router-role-authorization';
import {RoleAwareComponent} from 'react-router-role-authorization';
import Admin from "../../models/Admin";
import Project from "../../models/Project";
import PageSubHeading from "../PageSubHeading.jsx";
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table';
import Moment from 'react-moment';
import 'moment/locale/cs';
import {Link} from "react-router";
import * as RB from "react-bootstrap";



export default class AdminPage extends AuthorizedComponent {

  constructor(props) {
    super(props);

    // this.userRoles = [this.props.user.role];
    // this.notAuthorizedPath = '/login';
    this.userRoles = [this.props.user.role];
    this.notAuthorizedPath = '/login';


    this.state = {
      users: [],
      inspectedUser: "",
      userProjects: [],
    }
  }

  @autobind
  componentDidMount() {
    this.loadUsers();
  }

  componentWillUnmount() {
    this.setState({users: []})
  }

  @autobind
  loadUsers() {
    Admin.getUsers().then(response => {
      console.log(response.projects);
      this.setState({users: response.users});
    }).catch(error => {
      throw(error);
    });
  }

  @autobind
  setRole(id, role) {
    Admin.setRole({id, role}).then((response) => {
      this.loadUsers();
    }).catch(error => {
      throw(error);
    });
  }

  @autobind
  inspectUserProjects(id, userName) {
    this.setState({inspectedUser: userName})
    Project.getAll(id).then((response) => {
      this.setState({userProjects: response.projects})
    })
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
      </div>
    )
  }

  render() {

    this.state.users.map((user, i) => {
      console.log(user);
    });


    return (
      <div className="Layout-section">
        <PageSubHeading label="Administrace"/>
        <h1>TODO</h1>
        <ul>
        </ul>
        <Table className={"responsiveTable:30em"}>
          <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Jméno</Th>
            <Th>Email</Th>
            <Th>Počet projektů</Th>
            <Th>Poznámka</Th>
            <Th>Uživatel</Th>
            <Th>Správce metodiky</Th>
            <Th>Administrátor</Th>
          </Tr>
          </Thead>
          <Tbody>
          {this.state.users.map((user, i) =>
            <Tr key={i}>
              <Td>{user.id}</Td>
              <Td>{user.name} {user.surname}</Td>
              <Td>{user.email}</Td>
              <Td>
                <div className="u-isActionable" onClick={() => this.inspectUserProjects(user.id, user.name)}>{user.projects.length}</div>
              </Td>
              <Td>{user.note}</Td>
              <Td>
                <div className="u-isActionable" onClick={() => this.setRole(user.id, 1)}>{(user.roles[0].name === "user") ? <span className="glyphicon glyphicon-ok"></span> : <span className="glyphicon glyphicon-remove"></span>}</div>
              </Td>
              <Td>
                <div className="u-isActionable" onClick={() => this.setRole(user.id, 2)}>{(user.roles[0].name === "methodology_curator") ? <span className="glyphicon glyphicon-ok"></span> :
                  <span className="glyphicon glyphicon-remove"></span>}</div>
              </Td>
              <Td>
                <div className="u-isActionable" onClick={() => this.setRole(user.id, 3)}>{(user.roles[0].name === "admin") ? <span className="glyphicon glyphicon-ok"></span> : <span className="glyphicon glyphicon-remove"></span>}</div>
              </Td>
            </Tr>
          )}
          </Tbody>
        </Table>
        {(this.state.userProjects.length > 0) ?
          <div>
            <PageSubHeading subHeading="true" label={`Projekty uživatele ${this.state.inspectedUser}`}/>
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
                {this.state.userProjects.map((project, i) =>
                  <Tr key={i}>
                    <Td>{project.id}</Td>
                    <Td>{project.name}</Td>
                    <Td>{project.description}</Td>
                    <Td> <Moment format="YYYY/MM/DD">{project.updated_at}</Moment></Td>
                    <Td>{ this.renderActionButtons(project.id) }</Td>
                  </Tr>
                )}
                </Tbody>
              </Table>

          </div> : null
        }
      </div>
    );
  }
}

