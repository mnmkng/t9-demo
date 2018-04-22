import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "./Layout";
import Phone from "./Phone";
import HomePage from "./HomePage";

export const App = () => (
  <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/phone" component={Phone} />
        </Switch>
      </Layout>
  </Router>
);

export default App;
