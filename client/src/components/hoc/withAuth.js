import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export default function withAuth(WrappedComponent) {
  class Authentication extends Component {
    render() {

      // I know that this is not an ideal solution.
      // If the prop is null, it means the page has
      // just been refreshed, so I'm just waiting
      // for the session to be established here.
      // Still better than a "loading" component
      // that would flash for < 50ms.
      if (this.props.authenticated == null) {
        return <div/>
      }

      if (this.props.authenticated === false) {
        return <Redirect to="/signin" />;
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
