import bem from "../utils/helpers";
import autobind from "autobind-decorator";
import React from "react";
import {Link} from "react-router";
import {BarChart, RadarChart} from "react-chartjs";
import {RoleAwareComponent} from 'react-router-role-authorization';
import {VelocityComponent} from 'velocity-react';
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'

export default class MethodologyPanel extends RoleAwareComponent {

  constructor(props) {
    super(props);
    this.state = {
      descriptionVisible: true,
      chartData: []
    };

    this.allowedRoles = ['admin', 'methodology_curator'];
    this.userRoles = [this.props.user.role];
  }

  componentDidMount() {

  }

  @autobind
  onClick() {
    this.setState({descriptionVisible: !this.state.descriptionVisible});
  }

  render() {

    const RadarChart = require("react-chartjs").Radar; //Bez tohodle to nejede, nemám sílu řešit proč
    let graphLabels = [];
    let graphValues = {};

    graphLabels = [];
    graphValues = {};

    graphValues.methodology = {};
    graphValues.methodology.opt = {};
    graphValues.methodology.min = {};
    graphValues.methodology.max = {};

    this.props.methodology.criteria_values.map(
      criterium => {
        graphLabels.push(criterium.name);
        graphValues.methodology.opt[criterium.id] = criterium.max;
        graphValues.methodology.min[criterium.id] = criterium.min;
        graphValues.methodology.max[criterium.id] = criterium.opt;
      }
    )

    const radarData = {
      labels: graphLabels,
      datasets: [
        {
          label: 'Hodnoty metodiky(Maximální)',
          fill: false,
          fillColor: "rgba(255, 0, 0, 0.4)",
          strokeColor: "rgba(255, 0, 0, 0.4)",
          pointColor: "rgba(255, 0, 0, 0.4)",
          data: Object.keys(graphValues.methodology.opt).map(key => graphValues.methodology.max[key])
        },
        {
          label: 'Hodnoty metodiky(Minimální)',
          fill: false,
          fillColor: "rgba(0, 204, 255,0.4)",
          strokeColor: "rgba(0, 204, 255,0.4)",
          pointColor: "rgba(0, 204, 255,0.4)",
          data: Object.keys(graphValues.methodology.opt).map(key => graphValues.methodology.min[key])
        },
        {
          label: 'Hodnoty metodiky(Optimální)',
          fill: false,
          fillColor: "rgba(204, 255, 102,0.4)",
          strokeColor: "rgba(204, 255, 102,0.4)",
          pointColor: "rgba(204, 255, 102,0.4)",
          data: Object.keys(graphValues.methodology.opt).map(key => graphValues.methodology.opt[key])
        }
      ]
    }

    const radarOptions = {
      scaleOverlay: true,
      scaleOverride: false,
      scaleSteps: null,
      scaleStepWidth: null,
      scaleStartValue: null,
      scaleShowLine: true,
      scaleLineColor: "#999",
      scaleLineWidth: 1,
      scaleShowLabels: false,
      scaleLabel: "<%=value%>",
      scaleFontFamily: "'Arial'",
      scaleFontSize: 12,
      scaleFontStyle: "normal",
      scaleFontColor: "#666",
      scaleShowLabelBackdrop: true,
      scaleBackdropColor: "rgba(255,255,255,0.75)",
      scaleBackdropPaddingY: 2,
      scaleBackdropPaddingX: 2,
      angleShowLineOut: true,
      angleLineColor: "rgba(255,255,255,0.3)",
      angleLineWidth: 1,
      pointLabelFontSize: 12,
      pointLabelFontColor: "#000000",
      pointDot: true,
      pointDotRadius: 3,
      pointDotStrokeWidth: 1,
      datasetStroke: true,
      datasetStrokeWidth: 1,
      datasetFill: true,
      animation: true,
      animationSteps: 60,
      animationEasing: "easeOutQuart",
    }


    const BarChart = require("react-chartjs").Bar; //Bez tohodle to nejede, nemám sílu řešit proč
    // let data = [this.props.methodology.methodology_chosen.length,this.props.methodology.methodology_usable.length];

    const data = {
      labels: ["Doporučená", "Použitelná"],
      datasets: [
        {
          label: "Vyhodnocení projektů v aplikaci",
          fill: false,
          fillColor: ["rgba(153, 255, 153,0.7)", "rgba(255, 255, 153,0.7)"],
          borderWidth: 1,
          data: [this.props.methodology.methodology_chosen.length, this.props.methodology.methodology_usable.length],
        }
      ]
    };

    const methodologyMaxStyle = {
      backgroundColor: "rgba(255, 0, 0, 0.4)",
      padding: "5px"
    };

    const methodologyMinStyle = {
      backgroundColor: "rgba(0, 204, 255,0.4)",
      padding: "5px"
    };

    const methodologyOptStyle = {
      backgroundColor: "rgba(204, 255, 102,0.4)",
      padding: "5px"
    };

    const projectValStyle = {
      backgroundColor: "rgba(204, 51, 255, 0.4)",
      padding: "5px"
    };

    return (
      <div className={`${this.props.className} u-paddingB40px`}>
        <div className="padding20px">
          <div className="">
            <div className="">
              <h2 onClick={this.onClick}>Metodika <span className="u-weightSemibold">{this.props.methodology.name}</span></h2>
            </div>
            {/*<div className="u-paddingL20px u-paddingT15px">*/}
              {/*<span className={`DropdownArrow  ${this.state.descriptionVisible ? `DropdownArrow-isUp` : `DropdownArrow-isDown`}`}/>*/}
            {/*</div>*/}
          </div>
          {this.rolesMatched() ?
            <div className="linkContainer">
              <Link to={`/app/methodologies/edit/${this.props.methodology.id}`} data-hover="Upravit metodiku">
                Upravit metodiku
              </Link>
            </div>
            : ""}
        </div>
        <VelocityComponent animation={ this.state.descriptionVisible ? `slideDown` : `slideUp` } duration={500}>
          <div className="u-text1rem">
            <div className="u-flex">
              <div className="Grid Grid--wrap">
                <div className="u-size2of3 Grid-cell u-size1of1:0-45em u-paddingV20px">
                  <div className="Arrange Arrange--gutter10px ">
                    <div className="Arrange-sizeFit">
                      <div>
                        <span>Verze: </span>
                        <span className="u-weightBold">{this.props.methodology.version} </span>
                      </div>
                    </div>
                    <div className="Arrange-sizeFit">
                      <div>
                        <span>Vlastník: </span>
                        <span className="u-weightBold"> {this.props.methodology.owner} </span>
                      </div>
                    </div>
                    <div className="Arrange-sizeFit">
                      <div>
                        <span>Vydavatel: </span>
                        <span className="u-weightBold">{this.props.methodology.publisher}</span>
                      </div>
                    </div>
                    <div className="Arrange-sizeFit">
                      <div>
                        <span>Licence: </span>
                        <span className="u-weightBold">{this.props.methodology.licence}</span>
                      </div>
                    </div>
                  </div>
                  <div className="Arrange Arrange--gutter10px">
                    <div className="Arrange-sizeFit">
                      <div>
                        <span>Certifikát: </span>
                        <span className="u-weightBold">{this.props.methodology.certificate}</span>
                      </div>
                    </div>
                    <div className="Arrange-sizeFit">
                      <div>
                        <span>Jazyk: </span>
                        <span className="u-weightBold">{this.props.methodology.language} </span>
                      </div>
                    </div>
                  </div>
                  <div className="u-paddingT10px">
                    Odkaz: <a href={this.props.methodology.url}>{this.props.methodology.url}</a>
                  </div>
                  <div className="u-paddingT20px">{this.props.methodology.description}</div>
                  <div className="u-paddingT20px">{this.props.methodology.note}</div>
                </div>
                <div className="u-size1of3 Grid-cell u-size1of1:0-45em u-paddingH10px u-paddingV20px">
                  Počet výskytů ve vyhodnocení projektů
                  <BarChart data={data}/>
                </div>

                <div className="Grid-cell u-size1of1">
                  <Table className={"responsiveTable:65em"}>
                    <Thead>
                    <Tr>
                      <Th>Kritérium</Th>
                      <Th>Skupina</Th>
                      <Th>Minimum</Th>
                      <Th>Maximum</Th>
                      <Th>Optimum</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {this.props.methodology.criteria_values.map((criterion, i) =>
                      <Tr key={i}>
                        <Td>
                          <div className="">
                            <a className="button" href={`#crit_id${criterion.id}`}>
                              <span>{criterion.name}</span>
                            </a>
                            <div id={`crit_id${criterion.id}`} className="overlay">
                              <div className="popup">
                                <span className="u-text2rem lightboxHeadline">{criterion.name}</span>
                                <a className="close" href="#">&times;</a>
                                <div className="padding40px">
                                  <div className="u-text1_3rem u-paddingV10px">{criterion.criterion.description}</div>
                                  <div className="u-text1_3rem u-paddingV10px">{criterion.criterion.meaning}</div>
                                  {criterion.criterion.scale.split(/\n/).map((text) => {
                                      const obj = text.split(":")
                                      return (
                                        <div className="u-text1_3rem u-paddingV10px u-textLeft">
                                          <span className="u-weightBold">{obj[0]}: </span>
                                          {obj[1]}
                                        </div>
                                      )
                                    }
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Td>
                        <Td>{criterion.criterion.criteria_group_name.group_name}</Td>
                        <Td>{criterion.min}</Td>
                        <Td>{criterion.max}</Td>
                        <Td>{criterion.opt}</Td>
                      </Tr>
                    )}
                    </Tbody>
                  </Table>
                </div>
                <div className="u-centerizeHorizontally">
                  <div className="u-paddingT80px u-isHidden:0-35em">
                    <div className="Arrange u-flexWrap u-paddingB10px">
                      <div className="Arrange-sizeFill:60em Arrange-sizeFit" style={methodologyMaxStyle}>Hodnoty metodiky(Maximální)</div>
                      <div className="Arrange-sizeFill:60em Arrange-sizeFit" style={methodologyMinStyle}>Hodnoty metodiky(Minimální)</div>
                      <div className="Arrange-sizeFill:60em Arrange-sizeFit" style={methodologyOptStyle}>Hodnoty metodiky(Optimální</div>
                    </div>
                    <div className="u-maxWidth1200 u-padding20px u-paddingB80px u-centerizeHorizontally">
                      <RadarChart redraw={true} data={radarData} options={radarOptions}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </VelocityComponent>
      </div>
    )

  }
}