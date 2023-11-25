import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import {handleLogin}  from "../../services/userService";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
    };
  }

  handleOnChangeInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleLogin = async () => {
    console.log(this.state.username);
    console.log(this.state.password);
    await handleLogin(this.state.username, this.state.password);
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  render() {
    return (
      <div className="login_background">
        <div className="login_container">
          <div className="login_content row">
            <div className="col-12 text_login">Login</div>
            <div className="col-12 form-group login_input">
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder=""
                value={this.state.username}
                onChange={(event) => this.handleOnChangeInput(event)}
              />
              <label for="username">Username</label>
            </div>
            <div className="col-12 form-group login_input">
              <input
                type={this.state.isShowPassword ? "text" : "password"}
                className="form-control"
                name="password"
                placeholder=""
                value={this.state.password}
                onChange={(event) => this.handleOnChangeInput(event)}
              />
              <span
                onClick={() => {
                  this.handleShowHidePassword();
                }}
              >
                <i
                  class={
                    this.state.isShowPassword
                      ? "fas fa-eye"
                      : "fas fa-eye-slash"
                  }
                ></i>
              </span>
              <label for="password">Password</label>
            </div>
            <div className="col-12 btn_login_wrapper">
              <button
                className="btn_login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Log in
              </button>
            </div>
            <div className="col-12">
              <span className="forgot_password">Forgot your password?</span>
            </div>
            <div className="col-12 text-center mt-3">
              <span>Or sign in with:</span>
            </div>
            <div className="col-12 login_social">
              <a href="~">
                <i class="fab fa-google-plus-g google"></i>
              </a>
              <a href="~">
                <i class="fab fa-facebook-f facebook"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
