import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./UserFooter.scss";
import { FormattedMessage } from "react-intl"; //translate lang
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";

class UserFooter extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
    //fire redux event : action
  };

  render() {
    let language = this.props.language;
    console.log("check lang ", language);
    return (
      <>
        <section className="user_footer">
          <div className="container">
            <p> &copy; 2023 - Bản quyền thuộc về Mã Tuấn Tường</p>
          </div>
        </section>
      </>
    );
  }
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
