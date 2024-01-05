import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./UserFooter.scss";
import { FormattedMessage } from "react-intl"; //translate lang
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";

function UserFooter({ changeLanguageAppRedux, language }) {
  const changeLanguage = (language) => {
    changeLanguageAppRedux(language);
  };
  return (
    <>
      <section className="user_footer">
        <div className="container">
          <p> &copy; 2023, Mã Tuấn Tường</p>
        </div>
      </section>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserFooter);
