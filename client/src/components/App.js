import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "./Layout";
import Phone from "./Phone";
import HomePage from "./HomePage";
import withAuth from "./hoc/withAuth";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import SignOut from "./auth/SignOut";

class App extends Component {

  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/phone" component={withAuth(Phone)} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signout" component={SignOut} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
