import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import UserHeader from "../Header/UserHeader.jsx";
import BannerHomePage from "./BannerHomePage.jsx";
import PopularProduct from "./Section/PopularProduct.jsx";
import UserFooter from "../Footer/UserFooter.jsx";
class HomePage extends Component {
  render() {
    const NextArrow = (props) => {
      const { onClick } = props;
      return (
        <div className="control-btn" onClick={onClick}>
          <button className="next">
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      );
    };
    const PrevArrow = (props) => {
      const { onClick } = props;
      return (
        <div className="control-btn" onClick={onClick}>
          <button className="prev">
            <i className="fa fa-chevron-left"></i>
          </button>
        </div>
      );
    };
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      margin: 2000,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };

    return (
      <>
        <UserHeader />
        <BannerHomePage />
        <PopularProduct settings={settings} />
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
