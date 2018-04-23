import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Layout from "./Layout";
import Phone from "./Phone";
import HomePage from "./HomePage";
import withAuth from "./hoc/withAuth";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignOut from "./SignOut";

class App extends Component {
  componentDidMount() {
    this.props.checkSession();
  }

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

export default connect(null, actions)(App);
