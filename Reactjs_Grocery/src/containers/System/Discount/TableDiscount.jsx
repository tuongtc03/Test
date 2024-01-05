import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "../TableManage.scss";
import * as actions from "../../../store/actions"; // phải import dòng này để kết nối đến redux fire một action

function TableDiscount({
  fetchAllDiscountsStart,
  listDiscounts,
  deleteDiscount,
  handleUpdateDiscountFromParent,
}) {
  const [arrDiscounts, setArrDiscounts] = useState([]);
  const [arrDiscounts1, setArrDiscounts1] = useState([]);
  useEffect(() => {
    fetchAllDiscountsStart();
  }, []);

  useEffect(() => {
    setArrDiscounts(listDiscounts);
  }, [listDiscounts]);

  useEffect(() => {
    if (listDiscounts && listDiscounts.length > 0) {
      setArrDiscounts1(listDiscounts[0].id +1);
    }
  }, [listDiscounts]);

  const handleDeleteDiscount = (data) => {
    deleteDiscount(data.id);
  };

  const handleUpdateDiscount = (user) => {
    handleUpdateDiscountFromParent(user);
  };

  console.log("arrDiscounts1", arrDiscounts1);
  return (
    <div className="container_table">
      <table id="Table">
        <tbody>
          <tr>
            <th>
              <FormattedMessage id="manage-discount.id" />
            </th>
            <th>
              <FormattedMessage id="manage-discount.discountPercentage" />
            </th>
            <th>
              <FormattedMessage id="manage-discount.startDate" />
            </th>
            <th>
              <FormattedMessage id="manage-discount.endDate" />
            </th>
            <th>
              <FormattedMessage id="manage-discount.action" />
            </th>
          </tr>

          {arrDiscounts &&
            arrDiscounts.length > 0 &&
            arrDiscounts.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.discountPercentage}</td>
                  <td>{item.startDate.toString()}</td>
                  <td>{item.endDate.toString()}</td>
                  <td>
                    <button
                      className="btn_edit"
                      onClick={() => {
                        handleUpdateDiscount(item);
                      }}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button
                      className="btn_delete ms-2"
                      onClick={() => {
                        handleDeleteDiscount(item);
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
