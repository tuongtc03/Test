import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "../TableManage.scss";
import * as actions from "../../../store/actions"; // phải import dòng này để kết nối đến redux fire một action

class TableBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brandsRedux: [],
    };
  }

  componentDidMount = () => {
    this.props.fetchAllBrandsStart();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listBrands !== this.props.listBrands) {
      this.setState({
        brandsRedux: this.props.listBrands,
      });
    }
  }

  handleDeleteBrand = (data) => {
    this.props.deleteBrand(data.id);
  };

  handleUpdateBrand = (data) => {
    this.props.handleUpdateBrandFromParent(data);
  };

  render() {
    let arrBrands = this.state.brandsRedux;
    return (
      <div className="container_table">
        <table id="Table">
          <tbody>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>CateId</th>
              <th>Action</th>
            </tr>

            {arrBrands &&
              arrBrands.length > 0 &&
              arrBrands.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.cateId}</td>
                    <td>
                      <button
                        className="btn_edit"
                        onClick={() => {
                          this.handleUpdateBrand(item);
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn_delete ms-2"
                        onClick={() => {
                          this.handleDeleteBrand(item);
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
    listBrands: state.brand.brands, //users được khai bên admin là 1 mảng rỗng
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllBrandsStart: () => dispatch(actions.fetchAllBrandsStart()),
    deleteBrand: (id) => dispatch(actions.deleteBrand(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableBrand);
