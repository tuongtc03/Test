import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginAPI } from "../../services/userService";
function Login({ userLoginSuccess }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleOnChangeInput = (event) => {
    const { name, value } = event.target;
    if (name == "userName") {
      setUserName(value);
    } else if (name == "password") {
      setPassword(value);
    }
  };

  const handleLogin = async () => {
    setErrMessage("");
    try {
      const data = await handleLoginAPI(userName, password);
      if (data && data.errCode != 0) {
        setErrMessage(data.message);
      }
      if (data && data.errCode == 0) {
        userLoginSuccess(data.user);
        console.log("Login succeed!");
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          setErrMessage(e.response.data.message);
        }
      }
      console.log("error ", e.response);
    }
  };

  const handleShowHidePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleKeyDown = (event) => {
    if (event.key == "Enter") {
      handleLogin();
    }
  };

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
              value={userName}
              onChange={(event) => handleOnChangeInput(event)}
            />
            <label for="userName">Username</label>
          </div>
          <div className="col-12 form-group login_input">
            <input
              type={isShowPassword ? "text" : "password"}
              className="form-control"
              name="password"
              placeholder=""
              value={password}
              onChange={(event) => handleOnChangeInput(event)}
              onKeyDown={(event) => handleKeyDown(event)}
            />
            <span
              onClick={() => {
                handleShowHidePassword();
              }}
            >
              <i
                className={isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"}
              ></i>
            </span>
            <label for="password">Password</label>
          </div>
          <div className="col-12" style={{ color: "red" }}>
            {errMessage}
          </div>
          <div className="col-12 btn_login_wrapper">
            <button
              className="btn_login"
              onClick={() => {
                handleLogin();
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
