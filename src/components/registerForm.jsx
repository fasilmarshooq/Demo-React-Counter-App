import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { register } from "../Services/userService";
import { toast } from "react-toastify";

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
  doSubmit = async () => {
    try {
      await register(this.state.data);
      toast.info("User Registration successfull!!");
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
