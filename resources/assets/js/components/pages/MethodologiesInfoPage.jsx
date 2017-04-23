import autobind from "autobind-decorator";
import React from "react";
import * as RB from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';  // in ECMAScript 6
import {trans} from "../../utils/i18n.js";
import Methodology from "../../models/Methodology.js";
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'


export default class MethodologiesInfoPage extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  state = {
    data: [],
    criteria: [],
    canSubmit: false,
    errors: [],
  };

  @autobind
  submit(model) {
    Methodology
      .add(model)
      .then(response => this.context.router.push("/app/methodologies"))
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
  getMethodologies() {
    Methodology.getAll().then((response) => {
      this.setState({data: response.methodologies});
    });
  }

  @autobind
  componentDidMount() {
    if (this.props.params.id != undefined) {
      Methodology.getById(this.props.params.id).then(response => {
        this.setState({data: response.methodology, criteria: response.methodology.criteria_values});
      });
    }
  }


  render() {

    var RadarChart = require("react-chartjs").Radar; //Bez tohodle to nejede, nemám sílu řešit proč
    var graphLabels = [];
    var graphValues = {};

    graphLabels = [];
    graphValues = {};

    graphValues.methodology = {};
    graphValues.methodology.opt = {};
    graphValues.methodology.min = {};
    graphValues.methodology.max = {};

    this.state.criteria.map(
      criterium => {
        graphLabels.push(criterium.name);
        graphValues.methodology.opt[criterium.id] = criterium.max;
        graphValues.methodology.min[criterium.id] = criterium.min;
        graphValues.methodology.max[criterium.id] = criterium.opt;
      }
    )

    var radarData = {
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

    var radarOptions = {
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

    let errors = this.state.errors;

    if (errors.length) {
      errors = errors.map(function (error, idx) {
        return <RB.Alert bsStyle="danger" key={idx}>{error}</RB.Alert>;
      })
    }
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

    return (

      <div className="Layout-section">

        <div className="">
          <h2 onClick={this.onClick}>Metodika <span className="u-weightSemibold">{this.state.data.name}</span></h2>
        </div>

        <div className="u-text1rem u-paddingV20px">
          <div className="Arrange Arrange--gutter10px ">
            <div className="Arrange-sizeFit">
              <div>
                <span>Verze: </span>
                <span className="u-weightBold">{this.state.data.version} </span>
              </div>
            </div>
            <div className="Arrange-sizeFit">
              <div>
                <span>Vlastník: </span>
                <span className="u-weightBold"> {this.state.data.owner} </span>
              </div>
            </div>
            <div className="Arrange-sizeFit">
              <div>
                <span>Vydavatel: </span>
                <span className="u-weightBold">{this.state.data.publisher}</span>
              </div>
            </div>
            <div className="Arrange-sizeFit">
              <div>
                <span>Licence: </span>
                <span className="u-weightBold">{this.state.data.licence}</span>
              </div>
            </div>
          </div>
          <div className="Arrange Arrange--gutter10px">
            <div className="Arrange-sizeFit">
              <div>
                <span>Certifikát: </span>
                <span className="u-weightBold">{this.state.data.certificate}</span>
              </div>
            </div>
            <div className="Arrange-sizeFit">
              <div>
                <span>Jazyk: </span>
                <span className="u-weightBold">{this.state.data.language} </span>
              </div>
            </div>
          </div>
        </div>

        <div className="u-text1_3rem u-paddingV20px">{this.state.data.description}</div>
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
          {this.state.criteria.map((criterion, i) =>
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
    );
  }
}

