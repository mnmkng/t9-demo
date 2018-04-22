import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import * as actions from "../actions/index";
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
  handleFormSubmit = ({ email, password }) => {
    console.log(email, password);
    this.props.signinUser({ email, password });
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

export default reduxForm({
  form: "signin",
  fields: ["email", "password"]
})(connect(null, actions)(SignIn));
