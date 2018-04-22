import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import * as actions from "../actions/index";
import {message} from "antd";
import "./SignIn.css";

const renderInput = field => (
  <div>
    <input
      {...field.input}
      type={field.type}
      className={"ant-input signin-input"}
    />
    {field.meta.touched && field.meta.error}
    <span>{field.meta.error}</span>
  </div>
);

class SignIn extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.errorMessage) {
      message.error(this.props.errorMessage)
      prevProps.clearAuthError();
    }
  }

  handleFormSubmit = credentials => {
    const { signinUser, history } = this.props;
    signinUser(credentials, history);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset>
          <label style={{ display: "block" }}>Email:</label>
          <Field name="email" component={renderInput} type="email" />
        </fieldset>
        <fieldset>
          <label style={{ display: "block" }}>Password</label>
          <Field name="password" component={renderInput} type="password" />
        </fieldset>
        <button
          action="submit"
          className={"ant-btn ant-btn-primary signin-button"}
        >
          Sign In
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {errorMessage: state.auth.error}
}

export default reduxForm({
  form: "signin",
  fields: ["email", "password"]
})(connect(mapStateToProps, actions)(SignIn));
