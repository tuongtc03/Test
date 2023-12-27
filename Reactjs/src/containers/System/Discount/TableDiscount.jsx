import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "../TableManage.scss";
import * as actions from "../../../store/actions"; // phải import dòng này để kết nối đến redux fire một action

class TableDiscount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discountsRedux: [],
    };
  }

  componentDidMount = () => {
    this.props.fetchAllDiscountsStart();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listDiscounts !== this.props.listDiscounts) {
      this.setState({
        discountsRedux: this.props.listDiscounts,
      });
    }
  }

  handleDeleteDiscount = (data) => {
    this.props.deleteDiscount(data.id);
  };

  handleUpdateDiscount = (user) => {
    this.props.handleUpdateDiscountFromParent(user);
  };

  render() {
    let arrDiscounts = this.state.discountsRedux;
    return (
      <div className="container_table">
        <table id="Table">
          <tbody>
            <tr>
              <th>Id</th>
              <th>Discount percentage</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Action</th>
            </tr>

            {arrDiscounts &&
              arrDiscounts.length > 0 &&
              arrDiscounts.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.discountPercentage}</td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>
                      <button
                        className="btn_edit"
                        onClick={() => {
                          this.handleUpdateDiscount(item);
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn_delete ms-2"
                        onClick={() => {
                          this.handleDeleteDiscount(item);
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listDiscounts: state.discount.discounts, //users được khai bên admin là 1 mảng rỗng
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDiscountsStart: () => dispatch(actions.fetchAllDiscountsStart()),
    deleteDiscount: (id) => dispatch(actions.deleteDiscount(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableDiscount);
