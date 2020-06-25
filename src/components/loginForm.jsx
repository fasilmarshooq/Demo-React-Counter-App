import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from "../Services/authService";

class LoginForm extends Form {
  state = {
    data: { UserName: "", Password: "" },
    errors: {},
  };

  schema = {
    UserName: Joi.string().required().label("User Name"),
    Password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      await login(this.state.data);

      this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.UserName = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("UserName", "User Name")}
          {this.renderInput("Password", "Password", "Password")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
