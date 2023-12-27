import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "../TableManage.scss";
import * as actions from "../../../store/actions"; // phải import dòng này để kết nối đến redux fire một action

class TableCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesRedux: [],
    };
  }

  componentDidMount = () => {
    this.props.fetchCategoryRedux();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listCategories !== this.props.listCategories) {
      this.setState({
        categoriesRedux: this.props.listCategories,
      });
    }
  }

  handleDeleteCategory = (data) => {
    this.props.deleteCategoryRedux(data.id);
  };

  handleUpdateCategory = (data) => {
    this.props.handleUpdateCategoryFromParent(data);
  };

  render() {
    let arrCategories = this.state.categoriesRedux;
    return (
      <div className="container_table">
        <table id="Table">
          <tbody>
            <tr>
            <th>Id</th>
              <th>Name</th>

              <th>Action</th>
            </tr>

            {arrCategories &&
              arrCategories.length > 0 &&
              arrCategories.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>

                    <td>
                      <button
                        className="btn_edit"
                        onClick={() => {
                          this.handleUpdateCategory(item);
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn_delete ms-2"
                        onClick={() => {
                          this.handleDeleteCategory(item);
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
    listCategories: state.category.categories, //users được khai bên admin là 1 mảng rỗng
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategoryRedux: () => dispatch(actions.fetchAllCategoriesStart()),
    deleteCategoryRedux: (id) => dispatch(actions.deleteCategory(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableCategory);
