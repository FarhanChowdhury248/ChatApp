import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LandingPage, SessionPage } from "./pages";
import { PATHS } from "./shared/constants";

const App = () => {
  const [sessionData, setSessionData] = useState(null);
  return (
    <Router>
      <Route
        path={PATHS.LANDING_PAGE}
        exact
        component={() => <LandingPage setSessionData={setSessionData} />}
      />
      <Route
        path={PATHS.SESSION_PAGE}
        exact
        component={() => <SessionPage sessionData={sessionData} />}
      />
    </Router>
  );
};

export default App;
