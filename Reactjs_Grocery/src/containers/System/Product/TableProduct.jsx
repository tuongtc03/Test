import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "../TableManage.scss";
import * as actions from "../../../store/actions"; // phải import dòng này để kết nối đến redux fire một action
import { NumericFormat } from "react-number-format";

class TableProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsRedux: [],
      isOpen: false,
    };
  }

  componentDidMount = () => {
    this.props.fetchAllProductsStart();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listProducts !== this.props.listProducts) {
      this.setState({
        productsRedux: this.props.listProducts,
      });
    }
  }

  handleDeleteProduct = (data) => {
    this.props.deleteProductRedux(data.id);
  };

  handleUpdateProduct = (data) => {
    this.props.handleUpdateProductFromParent(data);
  };

  render() {
    let arrProducts = this.state.productsRedux;
    return (
      <div className="container_table">
        <table id="Table">
          <tbody>
            <tr>
              <th>
                <FormattedMessage id="manage-product.id" />
              </th>
              <th>
                <FormattedMessage id="manage-product.name" />
              </th>
              <th>
                <FormattedMessage id="manage-product.price" />
              </th>
              <th>
                <FormattedMessage id="manage-product.description" />
              </th>
              <th>
                <FormattedMessage id="manage-product.stockQuantity" />
              </th>
              <th>
                <FormattedMessage id="manage-product.cate" />
              </th>
              <th>
                <FormattedMessage id="manage-product.brand" />
              </th>
              <th>
                <FormattedMessage id="manage-product.discount" />
              </th>
              <th>
                <FormattedMessage id="manage-product.image" />
              </th>
              <th>
                <FormattedMessage id="manage-product.action" />
              </th>
            </tr>

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
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                      <NumericFormat
                        value={item.price}
                        className="price"
                        displayType="text"
                        thousandSeparator={true}
                      />
                    </td>
                    <td>{item.description}</td>
                    <td>{item.stockQuantity}</td>
                    <td>{item.categoryData.name}</td>
                    <td>{item.brandData.name}</td>
                    <td>{item.discountData.discountPercentage}%</td>
                    <td>
                      <div
                        className="imageBase64"
                        style={{
                          backgroundImage: `url(${imageBase64})`,
                        }}
                      ></div>
                    </td>
                    <td>
                      <button
                        className="btn_edit"
                        onClick={() => {
                          this.handleUpdateProduct(item);
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn_delete ms-2"
                        onClick={() => {
                          this.handleDeleteProduct(item);
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
    listProducts: state.product.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProductsStart: () => dispatch(actions.fetchAllProductsStart()),
    deleteProductRedux: (id) => dispatch(actions.deleteProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableProduct);
