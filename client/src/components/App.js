import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "./Layout";
import Phone from "./Phone";
import HomePage from "./HomePage";
import withAuth from "./hoc/withAuth";

export const App = () => (
  <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/phone" component={withAuth(Phone)} />
        </Switch>
      </Layout>
  </Router>
);

export default App;
