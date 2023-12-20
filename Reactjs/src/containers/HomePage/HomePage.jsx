import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import UserHeader from "../Header/UserHeader.jsx";
import BannerHomePage from "./BannerHomePage.jsx";
import PopularProduct from "./Section/PopularProduct.jsx";
import UserFooter from "../Footer/UserFooter.jsx";
class HomePage extends Component {
  render() {
    return (
      <>
        <UserHeader />
        <BannerHomePage />
        <PopularProduct />
        <UserFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
