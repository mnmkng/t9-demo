import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import * as actions from "../actions/index";
import { message } from "antd";
import "./SignIn.css";

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
        className={"ant-input signin-input"}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

class SignIn extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.errorMessage) {
      message.error(this.props.errorMessage);
      prevProps.clearAuthError();
    }
  }

  handleFormSubmit = credentials => {
    const { signinUser, history } = this.props;
    signinUser(credentials, err => {
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
  return errors;
};

export default reduxForm({
  form: "signin",
  validate
})(connect(mapStateToProps, actions)(SignIn));
