import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: { UserName: "", Password: "", Name: "" },
    errors: {},
  };
  schema = {
    UserName: Joi.string().email().required().label("User Name"),
    Password: Joi.string().required().min(3).label("Password"),
    Name: Joi.string().required().label("Name"),
  };
  doSubmit = () => {
    console.log("form submitted");
  };

  render() {
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("UserName", "User Name")}
          {this.renderInput("Password", "Password", "Password")}
          {this.renderInput("Name", "Name")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
