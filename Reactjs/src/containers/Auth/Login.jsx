import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginAPI } from "../../services/userService";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleOnChangeInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginAPI(this.state.userName, this.state.password);
      console.log("data ", data);
      if (data && data.errCode != 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("Login succeeds");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
      console.log("error ", error.response);
    }
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
                name="userName"
                className="form-control"
                placeholder=""
                value={this.state.userName}
                onChange={(event) => this.handleOnChangeInput(event)}
              />
              <label for="userName">Username</label>
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
                  className={
                    this.state.isShowPassword
                      ? "fas fa-eye"
                      : "fas fa-eye-slash"
                  }
                ></i>
              </span>
              <label for="password">Password</label>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
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
                <i className="fab fa-google-plus-g google"></i>
              </a>
              <a href="~">
                <i className="fab fa-facebook-f facebook"></i>
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
