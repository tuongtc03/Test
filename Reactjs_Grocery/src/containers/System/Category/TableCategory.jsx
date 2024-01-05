import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "../TableManage.scss";
import * as actions from "../../../store/actions"; // phải import dòng này để kết nối đến redux fire một action

function TableCategory({
  fetchCategoryRedux,
  listCategories,
  deleteCategoryRedux,
  handleUpdateCategoryFromParent,
}) {
  const [categoriesRedux, setCategoriesRedux] = useState([]);
  useEffect(() => {
    fetchCategoryRedux();
  }, []);
  useEffect(() => {
    setCategoriesRedux(listCategories);
  }, [listCategories]);

  const handleDeleteCategory = (data) => {
    deleteCategoryRedux(data.id);
  };

  const handleUpdateCategory = (data) => {
    handleUpdateCategoryFromParent(data);
  };

  return (
    <div className="container_table">
      <table id="Table">
        <tbody>
          <tr>
            <th>
              <FormattedMessage id="manage-category.id" />
            </th>
            <th>
              <FormattedMessage id="manage-category.name" />
            </th>
            <th>
              <FormattedMessage id="manage-category.image" />
            </th>
            <th>
              <FormattedMessage id="manage-category.action" />
            </th>
          </tr>

          {categoriesRedux &&
            categoriesRedux.length > 0 &&
            categoriesRedux.map((item, index) => {
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
                        handleUpdateCategory(item);
                      }}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button
                      className="btn_delete ms-2"
                      onClick={() => {
                        handleDeleteCategory(item);
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
    listCategories: state.category.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategoryRedux: () => dispatch(actions.fetchAllCategoriesStart()),
    deleteCategoryRedux: (id) => dispatch(actions.deleteCategory(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableCategory);
