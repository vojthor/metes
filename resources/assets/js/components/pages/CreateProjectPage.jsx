import autobind from "autobind-decorator";
import React from "react";
import {VelocityComponent} from 'velocity-react';
import ProjectEditForm from "../ProjectEditForm.jsx";
import ProjectValuesForm from "../ProjectValuesForm.jsx";
import Criteria from "../../models/Criteria";
import Project from "../../models/Project";
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'

export default class CreateProjectPage extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  };


  constructor(props) {
    super();

    this.state = {
      phase: 1,
      projectData: {},
      projectValueData: {},
      projectValueModel: {},
      phaseForce_1: false,
      phaseForce_2: false,
      phaseForce_3: false,
    }
  }

  componentDidMount() {
  }

  @autobind
  handleSave() {

    let dataModel = {};
    console.log(this.state.projectValueModel);

    // Fill empty spaces for non key criterions
    for (let i = 1; i < 27; i++) {
      dataModel[i] = (this.state.projectValueModel[i]) ? this.state.projectValueModel[i] : 0;
    }


    // Create
    Project
      .create(this.props.user.id, this.state.projectData)
      .then(response => {
        const projectId = response.project_id;
        Project.setCriteriaValues(this.props.user.id, projectId, dataModel)
          .then(response => this.context.router.push("/app/projects/edit/" + projectId))
          .catch(rejection => {
            this.setState({errors: rejection.errors});
          });
      })
      .catch(rejection => {
        this.setState({errors: rejection.errors});
      });

  }


  @autobind
  setProjectData(data) {
    this.setState({projectData: data});
    this.setState({phase: 2});
  }

  @autobind
  setProjectValueData(data) {
    this.getCriteria(data);
    this.setState({projectValueModel: data});
  }

  @autobind
  getCriteria(data) {
    Criteria.getAll().then(response => {
      const criteriaData = response.criteria.map((criteria) => {
        criteria.value = data[criteria.id];
        return criteria;
      });

      this.setState({projectValueData: criteriaData.reverse()});
      this.setState({phase: 3});
      this.setState({phaseForce_3: true});
      this.setState({finalPhase: true});
    })
  }

  @autobind
  handlePhaseForce(phase) {
    if (phase === 1) this.setState({phaseForce_1: !this.state.phaseForce_1});
    if (phase === 2) this.setState({phaseForce_2: !this.state.phaseForce_2});
    if (phase === 3) this.setState({phaseForce_3: !this.state.phaseForce_3});
  }

  render() {
    const phase_1 =
      <div className="u-bgMercury">
        <p className="u-colorCodGray u-paddingH20px  u-text1_3rem">Vyplňte prosím základní informace o projektu.</p>
        <ProjectEditForm data={{}} createNew={true} submit={this.setProjectData}/>
      </div>;


    const phase_2 =
      <div className="u-paddingH10px u-bgMySin">
        <p className="u-colorWhite u-paddingH20px u-text1_3rem">Definujte hodnoty pro výběrová kritéria. Doplňková lze později doplnit v detailu projektu.</p>
        <ProjectValuesForm keyOnly={true} createNew={true} saveDataAction={this.setProjectValueData}/>
      </div>;


    const phase_3 =
      <div className="u-bgMetes u-colorWhite">
        <div className="u-maxWidth960 u-centerizeHorizontally">
          <p className="u-paddingH20px u-text1_3rem">Zde mužete vidět všechny vložené údaje.</p>
          <p className="u-paddingH20px  u-text1_3rem">Pokud je vše správně, klikněte na tlačítko "Vytvořit projekt".</p>
          <div>
            <div className="Grid Grid--2col Grid--multiCol u-paddingH20px">
              <div className="Grid-cell">
                <div className="u-text1_5rem">Projekt:</div>
                <div className="u-text1_5rem">{this.state.projectData.name}</div>
              </div>
              <div className="Grid-cell">
                <div className="u-text1_5rem">Popis projektu:</div>
                <div className="u-text1_5rem"> {this.state.projectData.description}</div>
              </div>
            </div>
          </div>
          {this.state.projectValueData.length ?
            <Table className={"responsiveTable:65em responsiveTable--codGray"}>
              <Thead>
              <Tr>
                <Th>Kritérium</Th>
                <Th>Skupina</Th>
                <Th>Váha</Th>
                <Th>Klíčové</Th>
                <Th>Hodnota</Th>
              </Tr>
              </Thead>
              <Tbody>
              {this.state.projectValueData.map((criterion, i) => {

                {
                  if (!criterion.is_key) return null;
                }
                return (<Tr key={i}>
                  <Td>{criterion.name}</Td>
                  <Td>{criterion.group_name}</Td>
                  <Td>{criterion.weight}</Td>
                  <Td>{(criterion.is_key) ? `Ano` : `Ne`}</Td>
                  <Td><span className="u-weightSemibold">{criterion.value}</span></Td>
                </Tr>)
              })}

              </Tbody>
            </Table> : null
          }
          <div className="u-size1of1 formMetes formMetesButtonWrap u-paddingT5px">
            <input onClick={this.handleSave} className="btn buttonSuccess" type="submit" disabled={!this.state.finalPhase}
                   defaultValue={"Vytvořit projekt"}/>
          </div>
        </div>
      </div>;

    return (
      <div className="Layout-section">
        <div>
          <div onClick={() => this.handlePhaseForce(1)} className="u-bgMercury  u-paddingH20px u-paddingV10px">
            <span className="u-textDosis u-text2rem u-colorCodGray">Projekt</span>
          </div>
          <VelocityComponent animation={ (this.state.phase === 1 || this.state.phaseForce_1) ? `slideDown` : `slideUp` } duration={1500}>
            {phase_1}
          </VelocityComponent>
        </div>
        <div>
          <div onClick={() => this.handlePhaseForce(2)} className="u-bgMySin u-paddingH20px u-paddingV10px">
            <span className="u-textDosis u-text2rem u-colorWhite">Hodnoty kritérií</span>
          </div>
          <VelocityComponent animation={ (this.state.phase === 2 || this.state.phaseForce_2) ? `slideDown` : `slideUp` } duration={1500}>
            {phase_2}
          </VelocityComponent>
        </div>
        <div>
          <div onClick={() => this.handlePhaseForce(3)} className="u-bgMetes u-paddingH20px u-paddingV10px">
            <span className="u-textDosis u-text2rem u-colorWhite">Souhrn</span>
          </div>
          <VelocityComponent animation={ (this.state.phase === 3 || this.state.phaseForce_3) ? `slideDown` : `slideUp` } duration={1500}>
            {phase_3}
          </VelocityComponent>
        </div>
      </div>
    )
  }
}
;