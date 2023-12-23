import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./UserHeader.scss";
import { FormattedMessage } from "react-intl"; //translate lang
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";

class UserHeader extends Component {
  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
    //fire redux event : action
  };

  render() {
    let language = this.props.language;
    console.log("check lang ", language);
    return (
      <>
        <section className="user_header_container">
          <div className="container home_head_content">
            <div className="left_content">
              <div>
                <i className="fas fa-phone"></i>
                <label>0386040650</label>
              </div>
              <div>
                <i className="fas fa-envelope"> </i>
                <label> tuantuong326@gmail.com</label>
              </div>
            </div>

            <div className="right_content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="userheader.support" />
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language_vi active"
                    : "language_vi"
                }
              >
                <span onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>
                  🌐VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language_en active"
                    : "language_en"
                }
              >
                <span onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>
                  🌐EN
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="user_navbar_container">
          <div className="container home_header_content">
            <div className="left_content">
              <div className="header_logo"></div>
              <div className="child_content">
                <Link to="">
                  <i className="fa fa-shopping-basket icon-circle"></i>
                </Link>
              </div>
            </div>
            <div className="center_content">
              <div className="child_content">
                <div className="search_box f_flex">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    // value={wordEntered}
                    // onChange={handleFilter}
                  />
                  <button
                    type="submit "
                    className="submit btn btn-primary"
                    // onClick={handleSearch}
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="right_content">
              <div className="cart">
                <Link to="">
                  <i className="fa fa-shopping-bag icon-circle"></i>
                  <span>0</span>
                </Link>
              </div>
              <div className="login">
                <Link to="./login">
                  <i className="fa fa-user icon-circle"></i>
                </Link>
              </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);
