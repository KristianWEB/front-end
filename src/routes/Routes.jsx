import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import AuthPage from "../pages/AuthPage/AuthPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import UrlProfilePage from "../pages/ProfilePage/UrlProfilePage";
import AboutOverview from "../pages/AboutPage/AboutOverview";
import AboutWorkAndEducation from "../pages/AboutPage/AboutWorkAndEducation";
import AboutContactAndBasicInfo from "../pages/AboutPage/AboutContactAndBasicInfo";

import PrivateRoute from "./PrivateRoute";
import AboutRoute from "./AboutRoute";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/auth" component={AuthPage} />
        <PrivateRoute exact path="/profile" component={ProfilePage} />
        <AboutRoute exact path="/about_overview" component={AboutOverview} />
        <AboutRoute
          path="/about_work_and_education"
          component={AboutWorkAndEducation}
        />
        <AboutRoute
          exact
          path="/about_contact_and_basic_info"
          component={AboutContactAndBasicInfo}
        />
        <PrivateRoute
          exact
          path="/profile/:username"
          component={UrlProfilePage}
        />
        <Redirect from="*" to="/profile" />
      </Switch>
    </Router>
  );
};

export default Routes;
