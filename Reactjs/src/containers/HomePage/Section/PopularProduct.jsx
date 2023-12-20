import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./PopularProduct.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import slide4 from "../../../assets/images/slider/slide4.jpg";
import SliderProduct from "./SliderProduct";

class PopularProduct extends Component {
  render() {
    const NextArrow = (props) => {
      const { onClick } = props;
      return (
        <div className="control-btn" onClick={onClick}>
          <button className="next">
            <i class="fa fa-chevron-right"></i>
          </button>
        </div>
      );
    };
    const PrevArrow = (props) => {
      const { onClick } = props;
      return (
        <div className="control-btn" onClick={onClick}>
          <button className="prev">
            <i class="fa fa-chevron-left"></i>
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
        <section className="section_popular_product background">
          <div className="container">
            <div className="content_popular_product  d_flex">
              <div className="title_popular_product">
                <h2>Sản phẩm nổi bật</h2>
              </div>
              <div className="view_more">
                <Link to="">Xem thêm</Link>
              </div>
            </div>
            <div className="product_sliders">
              <Slider {...settings}>
                {SliderProduct.map((val, index) => {
                  return (
                    <>
                      <div key={index} className="product product_item">
                        <img src={val.cover} alt="" width="100%" />
                        <div>
                          <h3>{val.title}</h3>
                        </div>
                        <div className="d_flex">
                          <p className="desc">{val.description}</p>
                          <p className="price">{val.price}</p>
                        </div>
                        <div className="d_flex">
                          <Link to="">
                            <button className="btn_detail">Xem chi tiết</button>
                          </Link>
                          <button className="btn_buy">Mua ngay</button>
                        </div>
                      </div>
                    </>
                  );
                })}
              </Slider>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PopularProduct);
