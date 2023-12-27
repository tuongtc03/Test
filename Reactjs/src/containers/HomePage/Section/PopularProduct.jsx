import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./PopularProduct.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderProduct from "./SliderProduct";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";

class PopularProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrProducts: [],
    };
  }
  componentDidMount() {
    this.props.loadTopProducts();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topProducts !== this.props.topProducts) {
      this.setState({
        arrProducts: this.props.topProducts,
      });
    }
  }
  render() {
    let arrProducts = this.state.arrProducts;
    return (
      <>
        <section className="section_popular_product background">
          <div className="container">
            <div className="content_popular_product  d_flex">
              <div className="title_popular_product">
                <h2>
                  <FormattedMessage id="homepage.popular-product" />
                </h2>
              </div>
              <div className="view_more">
                <Link to=""> <FormattedMessage id="homepage.view-more" /></Link>
              </div>
            </div>
            <div className="product_sliders">
              <Slider {...this.props.settings}>
                {/* {SliderProduct.map((val, index) => {
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
                })} */}
                {arrProducts &&
                  arrProducts.length > 0 &&
                  arrProducts.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = Buffer.from(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    return (
                      <>
                        <div key={index} className="product product_item">
                          <div
                            className="imageBase"
                            style={{
                              backgroundImage: `url(${imageBase64})`,
                            }}
                          ></div>

                          {/* <p className="desc">
                            {item.discountData.discountPercentage}
                          </p> */}
                          <div>
                            <h4>{item.name}</h4>
                          </div>
                          <div className="d_flex">
                            <p className="desc">{item.description}</p>
                            <p className="price">{item.price.toString()} VNĐ</p>
                          </div>
                          <div className="d_flex">
                            <Link to="">
                              <button className="btn_detail">
                                Xem chi tiết
                              </button>
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
    topProducts: state.product.topProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopProducts: () => dispatch(actions.fetchTopProducts()),

    // createBrand: (data) => dispatch(actions.createBrand(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PopularProduct);
