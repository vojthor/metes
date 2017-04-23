// Polyfills
import * as ES6Shim from "es6-shim";
import * as fetchPolyfill from "whatwg-fetch";

import React from "react";
import ReactDOM from "react-dom";
import {Router, IndexRoute, Route, browserHistory, IndexRedirect} from "react-router";
import {Provider} from 'react-redux'

import MetesApp from "./components/MetesApp.jsx";
import DefaultLayout from "./components/layouts/DefaultLayout.jsx";
import AuthLayout from "./components/layouts/AuthLayout.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import LogoutPage from "./components/pages/LogoutPage.jsx";
import RegisterPage from "./components/pages/RegisterPage.jsx";
import DashboardPage from "./components/pages/DashboardPage.jsx";
import MethodologiesPage from "./components/pages/MethodologiesPage.jsx";
import MethodologiesEditPage from "./components/pages/MethodologiesEditPage.jsx";
import MethodologiesInfoPage from "./components/pages/MethodologiesInfoPage.jsx";
import ProjectsPage from "./components/pages/ProjectsPage.jsx";
import ProjectsEditPage from "./components/pages/ProjectsEditPage.jsx";
import ProjectsEditValuesPage from "./components/pages/ProjectsEditValuesPage.jsx";
import CriteriaPage from "./components/pages/CriteriaPage.jsx";
import CriteriaEditPage from "./components/pages/CriteriaEditPage.jsx";
import EvaluationPage from "./components/pages/EvaluationPage.jsx";
import EvaluationsPage from "./components/pages/EvaluationsPage.jsx";
import ResponsiveTestPage from "./components/pages/ResponsiveTestPage";
import UserPage from "./components/pages/UserPage.jsx";
import AdminPage from "./components/pages/AdminPage.jsx";
import CreateProjectPage from "./components/pages/CreateProjectPage.jsx";

import configureStore from "./store/configureStore";
import {getCurrentUser} from "./actions/userActions";
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'

require('velocity-animate');
require('velocity-animate/velocity.ui');

import {setLocale, setMessages} from "./utils/i18n.js";
import {redirectIfAuthenticated, redirectIfNotAuthenticated} from "./utils/auth.js";

// Setup i18n.
setLocale(window.MetesAppCfg.locale);
setMessages(window.MetesAppCfg.messages);


const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)
store.dispatch(getCurrentUser());

// Render the main router.
ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={MetesApp}>
        <Route path="login" component={AuthLayout}>
          <IndexRoute component={LoginPage} onEnter={redirectIfAuthenticated}/>
        </Route>
        <Route path="register" component={AuthLayout}>
          <IndexRoute component={RegisterPage} onEnter={redirectIfAuthenticated}/>
        </Route>
        <Route path="app" component={DefaultLayout} onEnter={redirectIfNotAuthenticated}>
          <IndexRedirect to="projects"/>
          <Route path="methodologies" component={MethodologiesPage}/>
          <Route path="methodologies/edit(/:id)" authorize={['admin, methodology_curator']} component={MethodologiesEditPage}/>
          <Route path="methodologies/info(/:id)" component={MethodologiesInfoPage}/>
          <Route path="projects" component={ProjectsPage}/>
          {/*<IndexRoute component={ProjectsPage}/>*/}
          <Route path="projects/edit(/:id)" component={ProjectsEditPage}/>
          {/*<Route path="evaluation" component={ProjectsEditPage}/>*/}
          <Route path="projects/create" component={CreateProjectPage}/>
          <Route path="projects/edit/:id/values" component={ProjectsEditValuesPage}/>
          <Route path="projects/evaluation(/:id)(/:eval_id)" component={EvaluationPage}/>
          <Route path="projects/evaluations" component={EvaluationsPage}/>
          <Route path="criteria" component={CriteriaPage}/>
          <Route path="criteria/edit(/:id)" component={CriteriaEditPage}/>
          <Route path="user" component={UserPage}/>
          <Route path="admin" authorize={['admin']} component={AdminPage}/>
          <Route path="logout" component={LogoutPage}/>
        </Route>
        <Route path="/responsive" component={ResponsiveTestPage}/>
      </Route>
    </Router>
  </Provider>), document.getElementById("app"));

