import autobind from "autobind-decorator";
import {bem} from "../../utils/helpers";
import React from "react";
import {Link} from "react-router";
import * as RB from "react-bootstrap";
import Formsy from "formsy-react";
import * as FRC from "formsy-react-components";
import {connect} from 'react-redux';
import {getProjectsAll} from "../../actions/projectActions";
import {getCurrentUser} from "../../actions/userActions";
import {AuthorizedComponent} from 'react-router-role-authorization';
import User from "../../models/User.js";
import PageSubHeading from "../PageSubHeading.jsx";


import {trans} from "../../utils/i18n.js";


class UserPage extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      saveSuccess: false,
      errors: [],
      canSubmit: false,
    };
  }


  componentDidMount() {
    this.props.dispatch(getProjectsAll(this.props.user.id));
  }

  @autobind
  submit(model) {
    User
      .update(model)
      .then((response) => {
        this.props.dispatch(getCurrentUser());
        this.setState({saveSuccess: true});
      })
      .catch((response) => {
      console.log(response);
        this.setState({errors: response.errors});
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


  render() {

    const projectCount = this.props.projects.length;

    return (
      <div className="Layout-section">
        <PageSubHeading label="Uživatelský účet"/>
        {this.state.saveSuccess ? <RB.Alert bsStyle="success">Změny úspěšně uloženy</RB.Alert> : "" }
        <div className={bem("Grid/1col/multiCol:40em/2col:40em/wrap")}>
          <div className="Grid-cell">
            <Formsy.Form className="form-horizontal formMetes"
                         onValidSubmit={this.submit}
                         onValid={this.enableButton}
                         onInvalid={this.disableButton}>

              <FRC.Input label="Jméno uživatele"
                         type="text"
                         name="name"
                         placeholder="Jméno"
                         value={this.props.user.name}
                         required
                         rowClassName=""
                         labelClassName={[{'col-sm-3': false}, 'col-xs-12']}
                         elementWrapperClassName={[{'col-sm-9': false}, 'col-xs-12 u-text1rem']}
              />

              <FRC.Input label="Příjmení"
                         type="text"
                         name="surname"
                         placeholder="Příjmení"
                         value={this.props.user.surname}
                         required
                         rowClassName=""
                         labelClassName={[{'col-sm-3': false}, 'col-xs-12']}
                         elementWrapperClassName={[{'col-sm-9': false}, 'col-xs-12 u-text1rem']}
              />

              <FRC.Input label={trans("auth.email")}
                         labelClassName={[{'col-sm-3': false}, 'col-xs-12']}
                         elementWrapperClassName={[{'col-sm-9': false}, 'col-xs-12 u-text1rem']}
                         validations="isEmail"
                         validationErrors={{
                           isEmail: trans("validation.email"),
                         }}
                         type="email"
                         name="email"
                         placeholder={trans("auth.email")}
                         value={this.props.user.email}
                         required/>
              <FRC.Input label="Společnost"
                         type="text"
                         name="company"
                         placeholder="Společnost"
                         value={this.props.user.company}
                         rowClassName=""
                         labelClassName={[{'col-sm-3': false}, 'col-xs-12']}
                         elementWrapperClassName={[{'col-sm-9': false}, 'col-xs-12 u-text1rem']}
              />

              <div className="u-sendRight u-paddingT10px">
                <input className="btn btn-primary" type="submit" defaultValue="Uložit" disabled={!this.state.canSubmit}/>
              </div>
            </Formsy.Form>
          </div>
          <div className="Grid-cell">
            {/*Počet projektů: {projectCount}*/}
            {/*Počer vyhodnocení: {}*/}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    projects: state.projects
  };
}

export default connect(mapStateToProps)(UserPage);