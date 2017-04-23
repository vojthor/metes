import autobind from "autobind-decorator";
import {bem} from "../../utils/helpers";
import React from "react";
import {Link} from "react-router";
import * as RB from "react-bootstrap";
import Formsy from "formsy-react";
import * as FRC from "formsy-react-components";

import {trans} from "../../utils/i18n.js";

import User from "../../models/User.js";

export default class ResponsiveTestPage extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  state = {
    canSubmit: false,
    errors: [],
  };

  render() {
    let errors = this.state.errors;

    if (errors.length) {
      errors = errors.map(function (error, idx) {
        return <RB.Alert bsStyle="danger" key={idx}>{error}</RB.Alert>;
      })
    }

    return (
      <div>
        {bem("Grid/1col/wrap/multiCol:40em/2col:40em/3col:60em/4col:80em")}
        <div className={bem("Grid/1col/wrap/multiCol:40em/2col:40em/3col:60em/4col:80em")}>
          <div className="Grid-cell u-flexOne">
            <div className="u-padding40px u-bgCodGray u-flexOne">
              1
            </div>
          </div>
          <div className="Grid-cell u-flexOne ">
            <div className="u-padding40px u-bgMariner u-flexOne">
              2
            </div>
          </div>
          <div className="Grid-cell u-flexOne">
            <div className="u-padding10px u-bgMercury u-flexOne">
              <div className={bem("Grid/1col/wrap/multiCol:40em/2col:40em")}>
                <div className="Grid-cell">
                  <div className="u-padding40px u-bgWoodsmoke u-flexOne">
                    3.1
                  </div>
                </div>
                <div className="Grid-cell">
                  <div className="u-padding40px u-bgOuterSpace u-flexOne">
                    3.2
                  </div>
                </div>
                <div className="Grid-cell">
                  <div className="u-padding40px u-bgWoodsmoke u-flexOne">
                    3.3
                  </div>
                </div>
                <div className="Grid-cell">
                  <div className="u-padding10px u-bgOuterSpace">
                    <div className={bem("Grid/multiCol:0-40em/2col/wrap/1col:40em")}>
                      <div className="Grid-cell">
                        <div className="u-padding40px u-bgCodGray u-flexOne">
                          3.4.1
                        </div>
                      </div>
                      <div className="Grid-cell">
                        <div className="u-padding40px u-bgShark u-flexOne">
                          3.4.2
                        </div>
                      </div>
                      <div className="Grid-cell">
                        <div className="u-padding40px u-bgSilver u-flexOne">
                          3.4.3
                        </div>
                      </div>
                      <div className="Grid-cell">
                        <div className="u-padding40px u-bgMineShaft u-flexOne">
                          3.4.4
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Grid-cell u-flexOne">
            <div className="u-padding40px u-bgWildSand u-flexOne">
              4
            </div>
          </div>
        </div>
      </div>
    );
  }
}