import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux"; // use to connect react from redux
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils"; //use to gán giá trị thay đổi mỗi lần thực thi action
import { categoryService } from "../../../services/categoryService";
import * as actions from "../../../store/actions"; // phải import dòng này để kết nối đến redux fire một action
import "./CU_Product.scss";
import Lightbox from "react-image-lightbox"; // use to zoom in image
import "react-image-lightbox/style.css";
import TableProduct from "./TableProduct";

class CU_Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryArr: [],
      brandArr: [],
      discountArr: [],
      previewImgURL: "",
      isOpen: false,
      selectedOption: "",

      id: "", // use to update
      name: "",
      price: "",
      description: "",
      stockQuantity: "",
      cateId: "",
      brandId: "",
      discountId: "",
      image: "",
      action: "",
    };
  }

  async componentDidMount() {
    this.props.getCategoriesStart();
    this.props.getBrandsStart();
    this.props.getDiscountsStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.categoryRedux !== this.props.categoryRedux) {
      let arrCategories = this.props.categoryRedux;
      this.setState({
        categoryArr: arrCategories,
        cateId:
          arrCategories && arrCategories.length > 0 ? arrCategories[0].id : "",
      });
    }
    if (prevProps.brandRedux !== this.props.brandRedux) {
      let arrBrands = this.props.brandRedux;
      this.setState({
        brandArr: arrBrands, // gán vào select option
        brandId: arrBrands && arrBrands.length > 0 ? arrBrands[0].id : "", // gán giá trị mặc định
      });
    }
    if (prevProps.discountRedux !== this.props.discountRedux) {
      let arrDiscounts = this.props.discountRedux;
      this.setState({
        discountArr: arrDiscounts, // gán vào select option
        discountId:
          arrDiscounts && arrDiscounts.length > 0 ? arrDiscounts[0].id : "", // gán giá trị mặc định
      });
    }
    if (prevProps.listProducts !== this.props.listProducts) {
      let arrCategories = this.props.categoryRedux;
      let arrBrands = this.props.brandRedux;
      let arrDiscounts = this.props.discountRedux;

      this.setState({
        name: "",
        price: "",
        description: "",
        stockQuantity: "",
        cateId:
          arrCategories && arrCategories.length > 0 ? arrCategories[0].id : "",
        brandId: arrBrands && arrBrands.length > 0 ? arrBrands[0].id : "",
        discountId:
          arrDiscounts && arrDiscounts.length > 0 ? arrDiscounts[0].id : "",
        image: "",
        previewImgURL: "",
        action: CRUD_ACTIONS.CREATE, // cập nhật lại thành create product
      });
    }
  }

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        image: base64, // image là 1 file
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  handleCreateUpdateProduct = () => {
    let isValid = this.checkValidateInput();
    if (!isValid) return;

    let { action } = this.state; // let action = this.state.action

    if (action === CRUD_ACTIONS.CREATE) {
      this.props.createProduct({
        name: this.state.name,
        price: this.state.price,
        description: this.state.description,
        stockQuantity: this.state.stockQuantity,
        cateId: this.state.cateId,
        brandId: this.state.brandId,
        discountId: this.state.discountId,
        image: this.state.image,
      });
    }

    if (action === CRUD_ACTIONS.EDIT) {
      this.props.updateProductRedux({
        id: this.state.id, //bắt buộc phải có để update
        name: this.state.name,
        price: this.state.price,
        description: this.state.description,
        stockQuantity: this.state.stockQuantity,
        cateId: this.state.cateId,
        brandId: this.state.brandId,
        discountId: this.state.discountId,
        image: this.state.image,
      });
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "name",
      "price",
      "description",
      "stockQuantity",
      "cateId",
      "brandId",
      "discountId",
    ];
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

  handleUpdateProductFromParent = (product) => {
    // chuyển đổi imageBase64
    let imageBase64 = "";
    if (product.image) {
      imageBase64 = new Buffer(product.image, "base64").toString("binary");
    }

    this.setState({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      stockQuantity: product.stockQuantity,
      cateId: product.cateId,
      brandId: product.brandId,
      discountId: product.discountId,
      image: "",
      previewImgURL: imageBase64,
      action: CRUD_ACTIONS.EDIT,
    });
  };

  buildDataInputSelect = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        object.label = item.name;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  render() {
    let categories = this.state.categoryArr;
    let brands = this.state.brandArr;
    let discounts = this.state.discountArr;
    let language = this.props.language;
    let isLoading = this.props.isLoading;
    let {
      name,
      price,
      description,
      stockQuantity,
      cateId,
      brandId,
      discountId,
      image,
    } = this.state;

    return (
      <>
        <div className="user_redux_container">
          <div className="title text-center">Manage product by redux</div>
          <div>{isLoading === true ? "Loading" : ""}</div>
          <div className="user_redux_body">
            <div className="container">
              <div className="row">
                <div className="col-12 my-3">
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-product.edit" />
                  ) : (
                    <FormattedMessage id="manage-product.add" />
                  )}
                </div>
                <div className="col-6">
                  <label htmlFor="">
                    <FormattedMessage id="manage-product.name" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(event) => {
                      this.onChangeInput(event, "name");
                    }}
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="">
                    <FormattedMessage id="manage-product.price" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={price}
                    onChange={(event) => {
                      this.onChangeInput(event, "price");
                    }}
                  />
                </div>
                <div className="col-9">
                  <label htmlFor="">
                    <FormattedMessage id="manage-product.description" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={(event) => {
                      this.onChangeInput(event, "description");
                    }}
                  />
                </div>
                <div className="col-3">
                  <label htmlFor="">
                    <FormattedMessage id="manage-product.stockQuantity" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={stockQuantity}
                    onChange={(event) => {
                      this.onChangeInput(event, "stockQuantity");
                    }}
                  />
                </div>
                <div className="col-3">
                  <label htmlFor="">
                    <FormattedMessage id="manage-product.cate" />
                  </label>
                  <select
                    id="inputState"
                    className="form-control"
                    onChange={(event) => {
                      this.onChangeInput(event, "cateId");
                    }}
                    value={cateId}
                  >
                    {categories &&
                      categories.length > 0 &&
                      categories.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-3">
                  <label htmlFor="">
                    <FormattedMessage id="manage-product.brand" />
                  </label>

                  <select
                    id="inputState"
                    className="form-control"
                    onChange={(event) => {
                      this.onChangeInput(event, "brandId");
                    }}
                    value={brandId}
                  >
                    {brands &&
                      brands.length > 0 &&
                      brands.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-3">
                  <label htmlFor="">
                    <FormattedMessage id="manage-product.discount" />
                  </label>
                  <select
                    id="inputState"
                    className="form-control"
                    onChange={(event) => {
                      this.onChangeInput(event, "discountId");
                    }}
                    value={discountId}
                  >
                    {discounts &&
                      discounts.length > 0 &&
                      discounts.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.discountPercentage}%
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-2">
                  <label htmlFor="">
                    <FormattedMessage id="manage-product.image" />
                  </label>
                  <div className="f_flex">
                    <input
                      id="previewImg"
                      type="file"
                      hidden
                      onChange={(event) => this.handleOnChangeImage(event)}
                    />
                    <label className="label_uploadImg" htmlFor="previewImg">
                      Tải ảnh <i className="fas fa-upload"></i>
                    </label>
                    <div
                      className="preview_img"
                      style={{
                        backgroundImage: `url(${this.state.previewImgURL})`,
                      }}
                      onClick={() => this.openPreviewImage()}
                    ></div>
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
                    onClick={() => this.handleCreateUpdateProduct()}
                  >
                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                      <FormattedMessage id="manage-product.save-btn" />
                    ) : (
                      <FormattedMessage id="manage-product.create-btn" />
                    )}
                  </button>
                </div>
                <div className="col-12 mb-3">
                  <TableProduct
                    handleUpdateProductFromParent={
                      this.handleUpdateProductFromParent
                    }
                    action={this.state.action}
                  />
                </div>
              </div>
            </div>
          </div>

          {this.state.isOpen === true && (
            <Lightbox
              mainSrc={this.state.previewImgURL}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categoryRedux: state.category.categories,
    // brandRedux: state.product.brands,
    brandRedux: state.brand.brands,
    discountRedux: state.discount.discounts,
    language: state.app.language,
    isLoading: state.admin.isLoading,
    listProducts: state.product.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoriesStart: () => dispatch(actions.fetchAllCategoriesStart()),
    // getBrandsStart: (cateId) => dispatch(actions.fetchBrandsByCateId(cateId)),
    getBrandsStart: () => dispatch(actions.fetchAllBrandsStart()),
    getDiscountsStart: () => dispatch(actions.fetchAllDiscountsStart()),

    createProduct: (data) => dispatch(actions.createProduct(data)),

    fetchAllProductsStart: () => dispatch(actions.fetchAllProductsStart()),

    updateProductRedux: (data) => dispatch(actions.updateProduct(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CU_Product);
