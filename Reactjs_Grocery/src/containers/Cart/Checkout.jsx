import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { ToastContainer } from "react-toastify";
import { NumericFormat } from "react-number-format";
import Select from "react-select";
import axios from "axios";

import * as actions from "../../store/actions";
import UserHeader from "../Header/UserHeader.jsx";
import UserFooter from "../Footer/UserFooter.jsx";
import "./Checkout.scss";

//@mui
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";

function Checkout({ getPaymentMethodsStart, paymentMethodRedux }) {
  const history = useHistory();
  const location = useLocation();
  const [totalCartPrice, setTotalCartPrice] = useState(
    location.state.totalCartPrice
  );
  const [vietnamAPI, setVietnamAPI] = useState([]);
  const [city, setCity] = useState([]);
  const [cityArr, setCityArr] = useState([]);
  const [citySelected, setCitySelected] = useState("");
  const [district, setDistrict] = useState([]);
  const [districtArr, setDistrictArr] = useState([]);
  const [districtSelected, setDistrictSelected] = useState("");
  const [ward, setWard] = useState([]);
  const [wardArr, setWardtArr] = useState([]);
  const [wardSelected, setWardSelected] = useState("");
  const [userInfoCheckout, setUserInfoCheckout] = useState("");
  const [userId, setUserId] = useState("");
  const [receiver, setReceiver] = useState("");
  const [totalPrice, setTotalPrice] = useState(totalCartPrice + 30000);
  const [addressDelivery, setAddressDelivery] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [note, setNote] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethodArr, setPaymentMethodArr] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  console.log("totalPrice", totalPrice);
  console.log("paymentMethod", paymentMethod);
  useEffect(() => {
    getPaymentMethodsStart();
  }, [getPaymentMethodsStart]);

  useEffect(() => {
    setPaymentMethodArr(paymentMethodRedux);
  }, [paymentMethodRedux]);

  console.log("paymentMethodArr", paymentMethodArr);
  // JSON parse lần 1 lấy userInfo
  useEffect(() => {
    const storedUser = localStorage.getItem("persist:user");
    console.log("storedUser", storedUser);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserInfoCheckout(parsedUser.userInfo);
    }
  }, []);
  console.log("userInfo", userInfoCheckout);

  // JSON parse lần 2 lấy fullName, phoneNumber, address
  useEffect(() => {
    if (userInfoCheckout) {
      const parsed = JSON.parse(userInfoCheckout);
      setReceiver(parsed.fullName);
      setPhoneNumber(parsed.phoneNumber);
      setAddressDelivery(parsed.address);
      setUserId(parsed.id);
    }
  }, [userInfoCheckout]);

  //get api VietNam
  useEffect(async () => {
    let res = await axios.get(
      "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
    );
    let data = res && res.data ? res.data : [];
    setVietnamAPI(data);
  }, []);
  console.log("vietnamAPI", vietnamAPI);

  //setup City
  useEffect(() => {
    let arrCity = buildDataInputSelectCity(vietnamAPI);
    setCityArr(arrCity);
  }, [vietnamAPI]);
  console.log("cityArr", cityArr);

  //setup District
  useEffect(() => {
    let arrDistrict = buildDataInputSelectDistrict(vietnamAPI, city);
    setDistrictArr(arrDistrict);
  }, [city]);
  console.log("districtArr", districtArr);

  //setup Ward
  useEffect(() => {
    let arrWard = buildDataInputSelectWard(vietnamAPI, city, district);
    setWardtArr(arrWard);
  }, [district]);
  console.log("districtArr ", wardArr);

  const handleMoveToHome = () => {
    history.push({ pathname: "./home" });
  };

  const handleMoveToCart = () => {
    history.goBack();
  };

  const buildDataInputSelectCity = (inputData) => {
    return inputData
      ? inputData.map((item) => ({
          value: item.Id,
          label: item.Name,
        }))
      : [];
  };

  const buildDataInputSelectDistrict = (inputData, city) => {
    return inputData
      ? inputData
          .filter((item) => item.Id === city.Id)
          .flatMap((item) =>
            item.Districts
              ? item.Districts.map((district) => ({
                  value: district.Id,
                  label: district.Name,
                }))
              : []
          )
      : [];
  };

  const buildDataInputSelectWard = (inputData, city, district) => {
    return inputData
      ? inputData
          .filter((item) => item.Id === city.Id)
          .flatMap((item) =>
            item.Districts
              ? item.Districts.filter(
                  (dist) => dist.Id === district.Id
                ).flatMap((dist) =>
                  dist.Wards
                    ? dist.Wards.map((ward) => ({
                        value: ward.Id,
                        label: ward.Name,
                      }))
                    : []
                )
              : []
          )
      : [];
  };

  const handleChangeCitySelect = (selectedOption) => {
    setCity({ Id: selectedOption.value, Name: selectedOption.label });
    setCitySelected(selectedOption);
  };

  const handleChangeDistrictSelect = (selectedOption) => {
    setDistrict({ Id: selectedOption.value, Name: selectedOption.label });
    setDistrictSelected(selectedOption);
  };

  const handleChangeWardSelect = (selectedOption) => {
    setWard({ Id: selectedOption.value, Name: selectedOption.label });
    setWardSelected(selectedOption);
  };

  const handleOnChangeInput = (event, id) => {
    if (id === "receiver") {
      setReceiver(event.target.value);
    } else if (id === "addressDelivery") {
      setAddressDelivery(event.target.value);
    } else if (id === "note") {
      setNote(event.target.value);
    }
  };
  console.log("receiver", receiver);
  console.log("addressDelivery", addressDelivery);
  console.log("note", note);
  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
    setPaymentMethod(event.target.value);
  };
  console.log("SelectedPaymentMethod", selectedPaymentMethod);
  console.log("select city", citySelected);
  console.log("cityy", city);
  console.log("district", district);
  console.log("ward", ward);
  console.log("totalCartPrice", totalCartPrice);
  return (
    <>
      <UserHeader />
      <div className="background">
        <div className="container_checkout">
          <div className="title">
            <h1>Checkout</h1>
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
              <Link
                onClick={handleMoveToCart}
                underline="hover"
                color="inherit"
              >
                Giỏ hàng
              </Link>
              <Typography color="text.primary">Thủ tục thanh toán</Typography>
            </Breadcrumbs>
          </div>
          <div className="d_flex">
            <div className="content_left">
              <div className="checkout_info">
                <div className="two_input">
                  <div className="name">
                    <TextField
                      id="outlined-basic"
                      label="Người nhận"
                      variant="outlined"
                      value={receiver}
                      onChange={(event) => {
                        handleOnChangeInput(event, "receiver");
                      }}
                    />
                  </div>
                  <div className="phoneNumber">
                    <TextField
                      id="outlined-basic"
                      label="Số điện thoại"
                      variant="outlined"
                      value={phoneNumber}
                      disabled
                    />
                  </div>
                </div>
                <div className="two_input">
                  <div className="city">
                    <Select
                      value={citySelected}
                      onChange={handleChangeCitySelect}
                      options={cityArr}
                      placeholder={"Chọn Tỉnh/Thành phố"}
                      required
                    />
                  </div>
                  <div className="district">
                    <Select
                      value={districtSelected}
                      onChange={handleChangeDistrictSelect}
                      options={districtArr}
                      placeholder={"Chọn Quận/Huyện"}
                      required
                    />
                  </div>
                </div>
                <div className="ward">
                  <Select
                    value={wardSelected}
                    onChange={handleChangeWardSelect}
                    options={wardArr}
                    placeholder={"Chọn Phường/Xã"}
                    required
                  />
                </div>
                <div className="home_address">
                  <TextField
                    id="outlined-basic"
                    label="Số nhà, tên đường"
                    variant="outlined"
                    value={addressDelivery}
                    onChange={(event) => {
                      handleOnChangeInput(event, "addressDelivery");
                    }}
                    required
                  />
                </div>
                <div className="note">
                  <TextField
                    id="outlined-basic"
                    label="Ghi chú"
                    variant="outlined"
                    value={note}
                    onChange={(event) => {
                      handleOnChangeInput(event, "note");
                    }}
                  />
                </div>
                <div className="paymentMethod">
                  <h5>Chọn phương thức thanh toán</h5>
                  <div className="d_flex item_radioBtn">
                    {paymentMethodArr &&
                      paymentMethodArr.length > 0 &&
                      paymentMethodArr.map((item, index) => (
                        <label key={index}>
                          <input
                            type="radio"
                            value={item.keyMap}
                            checked={selectedPaymentMethod === item.keyMap}
                            onChange={handlePaymentMethodChange}
                          />
                          {item.value_vi}
                        </label>
                      ))}
                  </div>
                </div>
                <div className="finish_buy">
                  <button>Hoàn tất mua</button>
                </div>
              </div>
            </div>
            <div className="content_right">
              <h3>Tóm tắt giỏ hàng</h3>
              <div className=" beforePrice">
                <span>Tiền hàng</span>
                <NumericFormat
                  value={totalCartPrice}
                  className="price"
                  displayType="text"
                  thousandSeparator={true}
                  suffix=" VND"
                />
              </div>
              <div className="d_flex ship">
                <span>Phí giao hàng, phụ phí</span>
                <NumericFormat
                  value={30000}
                  className="price"
                  displayType="text"
                  thousandSeparator={true}
                  suffix=" VND"
                />
              </div>
              <div className="totalPrice">
                <span className="labelPrice">Tổng tiền</span>
                <NumericFormat
                  value={totalPrice}
                  className="price"
                  displayType="text"
                  thousandSeparator={true}
                  suffix=" VND"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserFooter />
    </>
  );
}

// Get variable from reducer
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    paymentMethodRedux: state.order.payments,
  };
};

// Get function from action
const mapDispatchToProps = (dispatch) => {
  return {
    getPaymentMethodsStart: () => dispatch(actions.fetchPaymentMethodStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
