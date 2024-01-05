import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { ToastContainer } from "react-toastify";
import { NumericFormat } from "react-number-format";

import UserHeader from "../Header/UserHeader.jsx";
import UserFooter from "../Footer/UserFooter.jsx";
import "./Cart.scss";

//@mui
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Cart({
  cartItem,
  setCardItem,
  handleAddToCart,
  handleDecreaseQuantity,
  handleRemoveProductFromCart,
}) {
  const history = useHistory();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItem));
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCardItem(JSON.parse(storedCart));
    }
  }, []);

  const totalCartPrice = cartItem.reduce(
    (accumulatorPrice, item) => accumulatorPrice + item.quantity * item.price,
    0
  );

  const handleMoveToHome = () => {
    history.push({ pathname: "./home" });
  };

  const handleContinueShopping = () => {
    history.goBack();
  };

  const handleCheckout = () => {
    history.push({
      pathname: "./checkout",
      state: { totalCartPrice: totalCartPrice },
    });
  };

  const handleOnChangeQuantity = (cartId, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity > 0) {
      setCardItem((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === cartId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };
  console.log("cartItem", cartItem);
  return (
    <>
      <UserHeader />
      <div className="background">
        <div className="container_cart">
          <div className="title">
            <h1>Cart</h1>
          </div>
          <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                onClick={handleMoveToHome}
                underline="hover"
                color="inherit"
              >
                Trang chủ
              </Link>
              <Typography color="text.primary">Giỏ hàng</Typography>
            </Breadcrumbs>
          </div>
          <div className="continue_shopping">
            <button
              className="btn btn-primary"
              onClick={handleContinueShopping}
            >
              Tiếp tục mua hàng
            </button>
          </div>
          <div className="d_flex">
            <div className="content_left">
              <div className="field_product d_flex">
                <div className="product_info">
                  <h5>Mặt hàng</h5>
                </div>
                <div className="price">
                  <h5>Đơn giá</h5>
                </div>
                <div className="quantity">
                  <h5>Số lượng</h5>
                </div>
                <div className="subtotal">
                  <h5>Tạm tính</h5>
                </div>
                <div className="remove">
                  <h4></h4>
                </div>
              </div>
              {cartItem.length === 0 && (
                <h3 className="no_item product_item">
                  Chưa có sản phẩm nào trong giỏ hàng của bạn, vui lòng chọn mua
                  thêm sản phẩm.
                </h3>
              )}
              {cartItem &&
                cartItem.length > 0 &&
                cartItem.map((item, index) => {
                  const subTotal = item.price * item.quantity;
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = Buffer.from(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  return (
                    <div className="product_item" key={index}>
                      <div className="product_info">
                        <div className="item1">
                          <h5>{item.name}</h5>
                          <span>{item.description}</span>
                        </div>
                        <div
                          className="imageBase64 item2"
                          style={{
                            backgroundImage: `url(${imageBase64})`,
                          }}
                        ></div>
                      </div>
                      <div className="price">
                        <NumericFormat
                          value={item.price}
                          className="price"
                          displayType="text"
                          thousandSeparator={true}
                        />
                      </div>
                      <div className="quantity">
                        <button
                          className="decrease"
                          onClick={() => handleDecreaseQuantity(item)}
                        >
                          <i className="fas fa-minus"></i>
                        </button>

                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(event) =>
                            handleOnChangeQuantity(item.id, event)
                          }
                        />
                        <button
                          className="increase"
                          onClick={() => handleAddToCart(item)}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                      <div className="subtotal">
                        <NumericFormat
                          value={subTotal}
                          className="price"
                          displayType="text"
                          thousandSeparator={true}
                        />
                      </div>
                      <div className="remove">
                        <button
                          onClick={() => handleRemoveProductFromCart(item)}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="content_right">
              <h3>Tóm tắt giỏ hàng</h3>
              <div className="d_flex totalPrice">
                <h4>Tổng tiền</h4>
                <NumericFormat
                  value={totalCartPrice}
                  className="price"
                  displayType="text"
                  thousandSeparator={true}
                  suffix=" VND"
                />
              </div>
              <div className="checkout">
                <button onClick={handleCheckout}>Đặt hàng</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserFooter />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
