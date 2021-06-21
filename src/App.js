import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LandingPage, SessionPage } from "./pages";
import { PATHS } from "./shared/constants";

const App = () => {
  return (
    <Router>
      <Route path={PATHS.LANDING_PAGE} exact component={LandingPage} />
      <Route path={PATHS.SESSION_PAGE} exact component={SessionPage} />
    </Router>
  );
};

export default App;
