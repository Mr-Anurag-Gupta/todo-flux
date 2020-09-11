import React from "react";
import NavBar from "./NavBar";
import HistoryPage from "./HistoryPage";
import HomePage from "./HomePage";
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <NavBar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/history" component={HistoryPage} />
        <Redirect from="/home" to="/" />
      </Switch>
    </div>
  );
}

export default App;
