import React from "react";

import User from "../models/User.js";
import {connect} from 'react-redux';


class MetesApp extends React.Component {
  state = {
    user: null,
    loggedIn: false,
    userLoaded: false,
  };

  componentWillMount() {
    this.setState({
      user: this.props.user,
      projects: this.props.projects
    });
  }

  render() {
    if (this.props.user) {
      return React.cloneElement(this.props.children, {
        ...this.state
      });
    } else {
      return <div>Loading app...</div>;
    }
  }
}

function mapStateToProps(state, ownProps) {

  return (
    {
      user: state.user,
      projects: state.projects
    }
  );
}

export default connect(mapStateToProps)(MetesApp);