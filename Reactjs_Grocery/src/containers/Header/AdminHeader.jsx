import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, userMenu } from "./menuApp";
import "./AdminHeader.scss";
import { LANGUAGES } from "../../utils";
import { FormattedMessage } from "react-intl";

function Header({ changeLanguageAppRedux, language, userInfo, processLogout }) {
  const handleChangeLanguage = (language) => {
    changeLanguageAppRedux(language);
  };

  return (
    <React.Fragment>
      <div className="header-container">
        <div className="header-tabs-container d_flex">
          <Link className="home" to="../home">
            Trang chủ
          </Link>
          <Navigator menus={adminMenu} />
        </div>

        <div className="right_content d_flex">
          <span className="welcome">
            <FormattedMessage id="userheader.welcome" />{" "}
            {userInfo && userInfo.fullName ? userInfo.fullName : ""}
          </span>
          <div className="languages d_flex">
            <div
              className={
                language == LANGUAGES.VI ? "language_vi active" : "language_vi"
              }
            >
              <span onClick={() => handleChangeLanguage(LANGUAGES.VI)}>
                🌐VN
              </span>
            </div>
            <div
              className={
                language == LANGUAGES.EN ? "language_en active" : "language_en"
              }
            >
              <span onClick={() => handleChangeLanguage(LANGUAGES.EN)}>
                🌐EN
              </span>
            </div>
          </div>
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="Log out"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
