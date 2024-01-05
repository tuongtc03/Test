import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./PopularProduct.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import { NumericFormat } from "react-number-format";

function PopularProduct({
  loadTopProducts,
  topProducts,
  settings,
  handleAddToCart,
}) {
  const [arrProducts, setArrProducts] = useState([]);
  useEffect(() => {
    loadTopProducts();
  }, [loadTopProducts]);

  useEffect(() => {
    setArrProducts(topProducts);
  }, [topProducts]);

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
              <Link to="">
                <FormattedMessage id="homepage.view-more" />
              </Link>
            </div>
          </div>
          <div className="product_sliders">
            <Slider {...settings}>
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
                          <h5>{item.name}</h5>
                        </div>
                        <div className="d_flex">
                          <p className="desc">{item.description}</p>
                          <p>
                            <NumericFormat
                              value={item.price}
                              className="price"
                              displayType="text"
                              thousandSeparator={true}
                              suffix=" VND"
                            />
                          </p>
                        </div>
                        <div className="d_flex">
                          <Link to="">
                            <button className="btn_detail">Xem chi tiết</button>
                          </Link>

                          <button
                            className="btn_buy"
                            onClick={() => handleAddToCart(item)}
                          >
                            Mua ngay
                          </button>
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

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topProducts: state.product.topProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopProducts: () => dispatch(actions.fetchTopProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PopularProduct);
