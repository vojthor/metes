import * as React from "react";
import {bem} from "../../utils/helpers";
import PageHeader from "../PageHeader.jsx";
import PageFooter from "../PageFooter.jsx";
import {Grid, Row, Col} from "react-bootstrap";
import {connect} from 'react-redux';

class AuthLayout extends React.Component {

  render() {
    return (
      <div id="AppWrapper" className="u-flex u-flexColumn">
        <PageHeader route={this.props.route} user={this.props.user}/>
        <div className="u-flexOne u-flex u-flexColumn">
          <div id="ContentWrapper" className={bem("u-centerizeHorizontally u-maxWidth1600 u-flexOne")}>
            <div className="Content">
              {React.cloneElement(this.props.children, this.props)}
            </div>
          </div>
        </div>
        <PageFooter/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    route: ownProps.location.pathname
  };
}

export default connect(mapStateToProps)(AuthLayout);