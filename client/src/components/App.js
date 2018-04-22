import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "./Layout";
import Phone from "./Phone";
import HomePage from "./HomePage";
import withAuth from "./hoc/withAuth";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export const App = () => (
  <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/phone" component={withAuth(Phone)} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </Layout>
  </Router>
);

export default App;
