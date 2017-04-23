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


class RegisterPage extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  state = {
    canSubmit: false,
    errors: [],
  };

  @autobind
  submit(model) {
    User
      .register(model)
      .then((response) => {
        this.props.dispatch(getCurrentUser());
        return this.context.router.push("/app");
      })
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

  render() {
    let errors = this.state.errors;

    if (errors.length) {
      errors = errors.map(function (error, idx) {
        return <RB.Alert bsStyle="danger" key={idx}>{error}</RB.Alert>;
      })
    }

    return (
      <div className="Layout-section u-paddingH80px:60em">
        <div className="u-size1of1 u-centerizeHorizontally">
          <Formsy.Form className="form-horizontal formMetes"
                       onValidSubmit={this.submit}
                       onValid={this.enableButton}
                       onInvalid={this.disableButton}>
            <div className="form-group">
              <div className="col-sm-offset-3 col-sm-9">
                <h2 className="form-signin-heading">{trans("auth.registration")}</h2>
                {errors.length ? errors : ""}
              </div>
            </div>
            <FRC.Input label={trans("auth.name")}
                       labelClassName={[{'col-sm-3': false}, 'col-xs-12']}
                       elementWrapperClassName={[{'col-sm-9': false}, 'col-xs-12 u-text1rem']}
                       type="text"
                       name="name"
                       placeholder={trans("auth.name")}
                       required
                       autofocus/>
            <FRC.Input label={trans("auth.surname")}
                       labelClassName={[{'col-sm-3': false}, 'col-xs-12']}
                       elementWrapperClassName={[{'col-sm-9': false}, 'col-xs-12 u-text1rem']}
                       type="text"
                       name="surname"
                       placeholder={trans("auth.surname")}
                       required/>
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
                       required/>
            <FRC.Input label={trans("auth.password")}
                       labelClassName={[{'col-sm-3': false}, 'col-xs-12']}
                       elementWrapperClassName={[{'col-sm-9': false}, 'col-xs-12 u-text1rem']}

                       type="password"
                       name="password"
                       placeholder={trans("auth.password")}
                       required/>
            <FRC.Input label={trans("auth.passwordConfirmation")}
                       labelClassName={[{'col-sm-3': false}, 'col-xs-12']}
                       elementWrapperClassName={[{'col-sm-9': false}, 'col-xs-12 u-text1rem']}
                       validations="equalsField:password"
                       validationErrors={{
                         equalsField: trans("validation.same")
                       }}
                       type="password"
                       name="passwordConfirmation"
                       placeholder={trans("auth.password")}
                       required/>

            <div className="u-sendRight">
              <input className="btn btn-primary" type="submit" defaultValue="Registrovat nový účet" disabled={!this.state.canSubmit}/>
            </div>
          </Formsy.Form>
          <div className="u-sendRight formMetes formMetesButtonWrap">
            <Link to="/login">
            <input className="btn buttonSuccess" type="button" defaultValue="Máte jíž účet?" />
            </Link>
          </div>
        </div>
      </div>
    )
      ;
  }
}

export default connect()(RegisterPage);