import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import * as actions from "../actions/index";
import { message } from "antd";
import "./SignUp.css";

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input
        {...input}
        placeholder={label}
        type={type}
        className={"ant-input signup-input"}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

class SignUp extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.errorMessage) {
      message.error(this.props.errorMessage);
      prevProps.clearAuthError();
    }
  }

  handleFormSubmit = ({email, password}) => {
    const { signupUser, history } = this.props;
    signupUser({email, password}, err => {
      if (!err) history.push("/phone");
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset>
          <Field
            name="email"
            component={renderField}
            type="email"
            label="Email"
          />
        </fieldset>
        <fieldset>
          <Field
            name="password"
            component={renderField}
            type="password"
            label="Password"
          />
        </fieldset>
        <fieldset>
          <Field
            name="passwordConfirmation"
            component={renderField}
            type="password"
            label="Confirm Password"
          />
        </fieldset>
        <button
          action="submit"
          className={"ant-btn ant-btn-primary signup-button"}
        >
          Sign Up
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 3) {
    errors.password = "Must be at least 3 characters long.";
  }
  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "Required";
  } else if (values.passwordConfirmation.length < 3) {
    errors.passwordConfirmation = "Must be at least 3 characters long.";
  }
  if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = "Password and confirmation do not match."
  }
  return errors;
};

export default reduxForm({
  form: "signup",
  validate
})(connect(mapStateToProps, actions)(SignUp));
