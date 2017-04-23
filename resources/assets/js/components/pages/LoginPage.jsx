import autobind from "autobind-decorator";
import React from "react";
import {Link} from "react-router";
import * as RB from "react-bootstrap";
import Formsy from "formsy-react";
import * as FRC from "formsy-react-components";

import {trans} from "../../utils/i18n.js";

import User from "../../models/User.js";
import {userLogin, getCurrentUser} from "../../actions/userActions";
import {connect} from 'react-redux';


class LoginPage extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  state = {
    rememberMe: true,
    canSubmit: false,
    errors: [],
  };

  @autobind
  submit(model) {
    User
      .login(model)
      .then((response) => {
        this.props.dispatch(getCurrentUser());
        this.context.router.push("/app");
      })
      .catch((response) => {
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

    let errors = [];

    if (this.state.errors.length) {
      console.log(this.state.errors);

      errors = this.state.errors.map(function (error, idx) {
        return <RB.Alert bsStyle="danger" key={idx}>{error}</RB.Alert>;
      })
    }

    return (
      <div className="Layout-section u-paddingH80px:60em">
        <div className="u-size1of1 u-centerizeHorizontally">
          <div className="">
            {(errors.length) ? errors : ""}
            <h2 className="form-signin-heading">{trans("auth.pleaseSignIn")}</h2>
          </div>

          <Formsy.Form className="form-horizontal formMetes"
                       labelClassName={[{'col-sm-3': false}, 'col-xs-12']}
                       elementWrapperClassName={[{'col-sm-9': false}, 'col-xs-12 u-text1rem']}
                       onValidSubmit={this.submit}
                       onValid={this.enableButton}
                       onInvalid={this.disableButton}>
            <FRC.Input label={trans("auth.email")}
                       labelClassName={[{'col-sm-3': false}, 'col-xs-12']}
                       elementWrapperClassName={[{'col-sm-9': false}, 'col-xs-12 u-text1rem']}
                       validations="isEmail"
                       validationErrors={{
                         isEmail: trans("validation.email"),
                       }}
                       type="email"
                       name="email"
                       value=""
                       defaultValue="Email"
                       placeholder={trans("auth.email")}
                       required
                       autofocus/>
            <FRC.Input label={trans("auth.password")}
                       labelClassName={[{'col-sm-3': false}, 'col-xs-12']}
                       elementWrapperClassName={[{'col-sm-9': false}, 'col-xs-12 u-text1rem']}
                       type="password"
                       name="password"
                       value=""
                       defaultValue="Heslo"
                       className="form-control"
                       placeholder={trans("auth.password")}
                       required/>
            <FRC.Checkbox
              labelClassName={[{'col-sm-3': false}, 'col-xs-12']}
              elementWrapperClassName={[{'col-sm-9': false}, 'col-xs-12 u-text1rem']}
              label={trans("auth.rememberMe")}
              value={this.state.rememberMe}
              name="rememberMe"
              type="checkbox"
            />

            <div className="u-sendRight u-paddingT10px">
              <input className="btn btn-primary" type="submit" defaultValue={trans("auth.signIn")} disabled={!this.state.canSubmit}/>
            </div>

          </Formsy.Form>
          <div className="u-sendRight formMetes formMetesButtonWrap">
            <Link to="/register">
              <input className="btn buttonSuccess" type="button" defaultValue="Registrace"/>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(LoginPage);