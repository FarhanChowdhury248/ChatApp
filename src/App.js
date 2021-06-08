import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LandingPage } from "./pages";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={LandingPage} />
    </Router>
  );
};

export default App;
