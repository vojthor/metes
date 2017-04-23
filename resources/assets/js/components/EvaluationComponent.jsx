import autobind from "autobind-decorator";
import React from "react";
import * as RB from "react-bootstrap";
import Formsy from "formsy-react";
import * as FRC from "formsy-react-components";
import  {RadarChart} from "react-chartjs";
import {trans} from "../utils/i18n.js";
import {Link} from "react-router";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import PageSubHeading from "./PageSubHeading.jsx";
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'


export default class EvaluationComponent extends React.Component {

  state = {
    data: []
  };

  componentDidMount() {

  }


  render() {

    const data = this.props.data;

    if (data.length < 1) {

      return false;

    } else {

      if (data.table_data === null) {

        return (

          <div>
            <h2> {data.project.name} </h2>
            <p> {data.project.description} </p>
            <p>{trans("evaluation.no_methodology")}</p>
          </div>
        )

      } else {

        const RadarChart = require("react-chartjs").Radar; //Bez tohodle to nejede, nemám sílu řešit proč

        let graphData = {};
        let graphLabels = [];
        let graphValues = {};
        let radarData = {};

        data.table_data.map(
          methodology => {

            graphLabels = [];
            graphValues = {};

            graphValues.methodology = {};
            graphValues.methodology.opt = {};
            graphValues.methodology.min = {};
            graphValues.methodology.max = {};
            graphValues.project = {};

            methodology.criteria.map(
              criterium => {
                graphLabels.push(criterium.name);
                graphValues.methodology.opt[criterium.id] = criterium.methodogy_opt;
                graphValues.methodology.min[criterium.id] = criterium.methodogy_min;
                graphValues.methodology.max[criterium.id] = criterium.methodogy_max;
                graphValues.project[criterium.id] = criterium.eval_project_val;
              }
            )

            radarData = {
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
                },
                {
                  label: 'Hodnoty projektu',
                  fill: false,
                  fillColor: "rgba(204, 51, 255,0.4)",
                  strokeColor: "rgba(204, 51, 255, 0.4)",
                  pointColor: "rgba(204, 51, 255, 0.4)",
                  data: Object.keys(graphValues.project).map(key => graphValues.project[key])
                }
              ]
            }

            graphData[methodology.id] = radarData;
          }
        );

        var radarOptions = {
          responsive: true,
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
          <div>
            <PageSubHeading label={trans('evaluation.project_eval')} edited={data.project.name}/>
            <div className="u-paddingB20px"> {data.project.description} </div>

            {data.table_data.map(
              methodology =>

                <div key={methodology.id}>
                  <div className="u-textDosis u-text2rem">
                    {methodology.methodology_model.name}
                    <span className="u-paddingL20px">
                    <Link className="btn btn-default"
                          to={"/app/methodologies/info/" + methodology.methodology_model.id}>
                      {trans("methodologies.detail")} <RB.Glyphicon glyph="info-sign"/>
                    </Link>
                    </span>
                  </div>
                  <div className="u-textDosis u-text1_3rem u-paddingV10px u-weightBold">
                    {methodology.type}
                  </div>
                  <p className="u-text1rem">{methodology.methodology_model.description}</p>

                  <Table className={"responsiveTable:65em"}>
                    <Thead>
                    <Tr>
                      <Th>Kritérium</Th>
                      <Th>Váha</Th>
                      <Th>Minimum</Th>
                      <Th>Maximum</Th>
                      <Th>Optimum</Th>
                      <Th>Hodnota projektu</Th>
                      <Th>Za hranicemi extrémů</Th>
                      <Th>Vzdálenost od optima</Th>
                      <Th>Važená absolutní hodnota</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {methodology.criteria.map((criterion, i) =>
                      <Tr key={i}>
                        <Td>{criterion.name}</Td>
                        <Td>{criterion.project_weight}</Td>
                        <Td>{criterion.methodogy_min}</Td>
                        <Td>{criterion.methodogy_max}</Td>
                        <Td>{criterion.methodogy_opt}</Td>
                        <Td>{criterion.eval_project_val}</Td>
                        <Td>{criterion.eval_behind_extreme}</Td>
                        <Td>{criterion.eval_dist_optimum}</Td>
                        <Td><b>{criterion.eval_dist_abs}</b></Td>
                      </Tr>
                    )}
                    </Tbody>
                  </Table>
                  <p className={"pull-right"}>Celkový součet absolutních vzdáleností: <b>{methodology.value}</b></p>

                  <div className="u-paddingT80px u-isHidden:0-35em">
                    <div className="Arrange u-flexWrap u-paddingB10px">
                      <div className="Arrange-sizeFill:60em Arrange-sizeFit" style={methodologyMaxStyle}>Hodnoty metodiky(Maximální)</div>
                      <div className="Arrange-sizeFill:60em Arrange-sizeFit" style={methodologyMinStyle}>Hodnoty metodiky(Minimální)</div>
                      <div className="Arrange-sizeFill:60em Arrange-sizeFit" style={methodologyOptStyle}>Hodnoty metodiky(Optimální</div>
                      <div className="Arrange-sizeFill:60em Arrange-sizeFit" style={projectValStyle}>Hodnoty projektu</div>
                    </div>
                    <div className="u-maxWidth1200 u-padding20px u-paddingB80px u-centerizeHorizontally">
                      <RadarChart className="evalChart" redraw={true} data={graphData[methodology.id]} options={radarOptions}/>
                    </div>
                  </div>

                </div>
            )}

          </div>
        )
      }
    }
  }
}
