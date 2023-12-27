import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux"; // use to connect react from redux
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils"; //use to gán giá trị thay đổi mỗi lần thực thi action
import * as actions from "../../../store/actions"; // phải import dòng này để kết nối đến redux fire một action
import "./CU_Discount.scss";
import Lightbox from "react-image-lightbox"; // use to zoom in image
import "react-image-lightbox/style.css";
import TableDiscount from "./TableDiscount";

class CU_Discount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "", // use to update
      discountPercentage: "",
      startDate: "",
      endDate: "",
      action: "",
    };
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listDiscounts !== this.props.listDiscounts) {
      this.setState({
        discountPercentage: "",
        startDate: "",
        endDate: "",
        action: CRUD_ACTIONS.CREATE,
      });
    }
  }

  handleCreateUpdateDiscount = () => {
    let isValid = this.checkValidateInput();
    if (!isValid) return;

    let { action } = this.state;

    if (action === CRUD_ACTIONS.CREATE) {
      this.props.createDiscount({
        discountPercentage: this.state.discountPercentage,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
      });
    }

    if (action === CRUD_ACTIONS.EDIT) {
      this.props.updateDiscount({
        id: this.state.id, //bắt buộc phải có để update
        discountPercentage: this.state.discountPercentage,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
      });
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["discountPercentage", "startDate", "endDate"];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("This input is required: " + arrCheck[i]);
        break;
      }
    }

    return isValid;
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };

    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleUpdateDiscountFromParent = (discount) => {
    //Cập nhật state = discount truyền vào từ child
    this.setState({
      id: discount.id,
      discountPercentage: discount.discountPercentage,
      startDate: discount.startDate,
      endDate: discount.endDate,
      action: CRUD_ACTIONS.EDIT,
    });
  };

  render() {
    let language = this.props.language;
    let isLoading = this.props.isLoading;
    let { discountPercentage, startDate, endDate } = this.state;

    return (
      <>
        <div className="user_redux_container">
          <div className="title text-center">Manage discount by redux</div>
          <div>{isLoading === true ? "Loading" : ""}</div>
          <div className="redux_body">
            <div className="container">
              <div className="row">
                <div className="col-12 my-3">
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-discount.edit" />
                  ) : (
                    <FormattedMessage id="manage-discount.add" />
                  )}
                </div>
                <div className="col-6">
                  <label htmlFor="">
                    <FormattedMessage id="manage-discount.discountPercentage" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={discountPercentage}
                    onChange={(event) => {
                      this.onChangeInput(event, "discountPercentage");
                    }}
                  />
                </div>
                <div className="col-3">
                  <label htmlFor="">
                    <FormattedMessage id="manage-discount.startDate" />
                  </label>
                  <div className="f_flex">
                  <input
                    type="text"
                    className="form-control"
                    value={startDate}
                    onChange={(event) => {
                      this.onChangeInput(event, "startDate");
                    }}
                  />
                  </div>
                </div>
                <div className="col-3">
                  <label htmlFor="">
                    <FormattedMessage id="manage-discount.endDate" />
                  </label>
                  <div className="f_flex">
                  <input
                    type="text"
                    className="form-control"
                    value={endDate}
                    onChange={(event) => {
                      this.onChangeInput(event, "endDate");
                    }}
                  />
                  </div>
                </div>
                <div className="col-12 my-3">
                  <button
                    type="submit"
                    className={
                      this.state.action === CRUD_ACTIONS.EDIT
                        ? "btn btn-warning"
                        : "btn btn-primary"
                    }
                    onClick={() => this.handleCreateUpdateDiscount()}
                  >
                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                      <FormattedMessage id="manage-discount.save-btn" />
                    ) : (
                      <FormattedMessage id="manage-discount.create-btn" />
                    )}
                  </button>
                </div>
                <div className="col-12 mb-3">
                  <TableDiscount
                    handleUpdateDiscountFromParent={
                      this.handleUpdateDiscountFromParent
                    }
                    action={this.state.action}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoading: state.admin.isLoading,
    listDiscounts: state.discount.discounts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createDiscount: (data) => dispatch(actions.createDiscount(data)),

    fetchAllDiscountsStart: () => dispatch(actions.fetchAllDiscountsStart()),

    updateDiscount: (data) => dispatch(actions.updateDiscount(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CU_Discount);
