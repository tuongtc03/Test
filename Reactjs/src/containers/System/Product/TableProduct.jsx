import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "../TableManage.scss";
import * as actions from "../../../store/actions"; // phải import dòng này để kết nối đến redux fire một action

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
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Stock quantity</th>
              <th>Category Id</th>
              <th>Brand Id</th>
              <th>Discount Id</th>
              <th>Image</th>
              <th>Action</th>
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
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>{item.stockQuantity}</td>
                    <td>{item.cateId}</td>
                    <td>{item.brandId}</td>
                    <td>{item.discountId}</td>
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
