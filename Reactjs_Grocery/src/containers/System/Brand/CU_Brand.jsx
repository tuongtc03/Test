import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux"; // use to connect react from redux
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils"; //use to gán giá trị thay đổi mỗi lần thực thi action
import * as actions from "../../../store/actions"; // phải import dòng này để kết nối đến redux fire một action
import "./CU_Brand.scss";
import Lightbox from "react-image-lightbox"; // use to zoom in image
import "react-image-lightbox/style.css";
import TableBrand from "./TableBrand";
import Select from "react-select";

class CU_Brand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: "",
      categoryArr: [],
      id: "",
      name: "",
      cateId: "",
      image: "",
      action: "",
      previewImgURL: "",
      isOpen: false,
    };
  }

  async componentDidMount() {
    this.props.getCategoriesStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.categoryRedux !== this.props.categoryRedux) {
      let arrCategories = this.buildDataInputSelect(this.props.categoryRedux);
      this.setState({
        categoryArr: arrCategories,
        cateId:
          arrCategories && arrCategories.length > 0 ? arrCategories[0].id : "",
      });
    }
    if (prevProps.listBrands !== this.props.listBrands) {
      let arrCategories = this.props.categoryRedux;
      this.setState({
        name: "",
        image: "",
        cateId:
          arrCategories && arrCategories.length > 0 ? arrCategories[0].id : "",
        previewImgURL: "",
        action: CRUD_ACTIONS.CREATE,
        selectedCategory: "",
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

  handleCreateUpdateBrand = () => {
    let isValid = this.checkValidateInput();
    if (!isValid) return;

    let { action } = this.state;

    if (action === CRUD_ACTIONS.CREATE) {
      this.props.createBrand({
        name: this.state.name,
        cateId: this.state.cateId,
        image: this.state.image,
      });
    }

    if (action === CRUD_ACTIONS.EDIT) {
      this.props.updateBrand({
        id: this.state.id, //bắt buộc phải có để update
        name: this.state.name,
        cateId: this.state.cateId,
        image: this.state.image,
      });
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["name", "cateId"];
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

  handleUpdateBrandFromParent = (brand) => {
    // chuyển đổi imageBase64
    let imageBase64 = "";
    if (brand.image) {
      imageBase64 = new Buffer(brand.image, "base64").toString("binary");
    }

    let { categoryArr } = this.state;
    let selectedCategory = "";

    if (categoryArr) {
      selectedCategory = categoryArr.find((item) => {
        return item && item.value === brand.cateId;
      });
    }

    this.setState({
      id: brand.id,
      name: brand.name,
      cateId: brand.cateId,
      image: "",
      previewImgURL: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      selectedCategory: selectedCategory,
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

  handleChangeSelectCategory = (selectedOption) => {
    console.log("selectedOption", selectedOption);
    this.setState({
      cateId: selectedOption.value,
      selectedCategory: selectedOption,
    });
  };

  render() {
    let categories = this.state.categoryArr;
    let language = this.props.language;
    let isLoading = this.props.isLoading;
    let { name, cateId, image } = this.state;
    return (
      <>
        <div className="user_redux_container">
          <div className="title text-center">Manage brand by redux</div>
          <div>{isLoading === true ? "Loading" : ""}</div>
          <div className="redux_body">
            <div className="container">
              <div className="row">
                <div className="col-12 my-3">
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-brand.edit" />
                  ) : (
                    <FormattedMessage id="manage-brand.add" />
                  )}
                </div>
                {this.state.action === CRUD_ACTIONS.EDIT ? (
                  <div className="col-1">
                    <label htmlFor="">
                      <FormattedMessage id="manage-product.id" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.id}
                      disabled
                    />
                  </div>
                ) : (
                  ""
                )}
                <div className="col-3">
                  <label htmlFor="">
                    <FormattedMessage id="manage-brand.name" />
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
                <div className="col-2">
                  <label htmlFor="">
                    <FormattedMessage id="manage-product.cate" />
                  </label>
                  <Select
                    value={this.state.selectedCategory}
                    onChange={this.handleChangeSelectCategory}
                    options={this.state.categoryArr}
                    placeholder={<FormattedMessage id="manage-product.cate" />}
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="">
                    <FormattedMessage id="manage-brand.image" />
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
                    onClick={() => this.handleCreateUpdateBrand()}
                  >
                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                      <FormattedMessage id="manage-brand.save-btn" />
                    ) : (
                      <FormattedMessage id="manage-brand.create-btn" />
                    )}
                  </button>
                </div>
                <div className="col-12 mb-3">
                  <TableBrand
                    handleUpdateBrandFromParent={
                      this.handleUpdateBrandFromParent
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
    language: state.app.language,
    isLoading: state.admin.isLoading,
    listBrands: state.brand.brands,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoriesStart: () => dispatch(actions.fetchAllCategoriesStart()),

    createBrand: (data) => dispatch(actions.createBrand(data)),

    fetchAllBrandsStart: () => dispatch(actions.fetchAllBrandsStart()),

    updateBrand: (data) => dispatch(actions.updateBrand(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CU_Brand);
