import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomePage.scss";
import { FormattedMessage } from "react-intl"; //translate lang
import image from "../../assets/images/subheader.svg";

import SliderBanner from "./SliderBanner";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class BannerHomePage extends Component {
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
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      margin: 2000,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };

    return (
      <>
        <div className="home_header_banner">
          <div className="decoration_subheader_banner">
            <img src={image} />
          </div>
          <div className="container title_banner">
            <h1>
              <FormattedMessage id="banner.title1" />
              <span>
                {" "}
                <FormattedMessage id="banner.title2" />
              </span>
            </h1>
            <h1>
              <FormattedMessage id="banner.title3" />
            </h1>
            <p>
              <FormattedMessage id="banner.child" />
            </p>
          </div>
          <div className="container banner_sliders">
            <Slider {...settings}>
              {SliderBanner.map((val, index) => {
                return (
                  <>
                    <div key={index}>
                      <img src={val.cover} alt="" width="100%" />
                    </div>
                  </>
                );
              })}
            </Slider>
          </div>
          <div className="a_buy_now">
            <Link to="" className="btn btn-primary">
              Mua sắm ngay
            </Link>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BannerHomePage);
