import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: { UserName: "", Password: "" },
    errors: {},
  };

  schema = {
    UserName: Joi.string().required().label("User Name"),
    Password: Joi.string().required().label("Password"),
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
