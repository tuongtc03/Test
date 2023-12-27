import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux"; // use to connect react from redux
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils"; //use to gán giá trị thay đổi mỗi lần thực thi action
import * as actions from "../../../store/actions"; // phải import dòng này để kết nối đến redux fire một action
import "./CU_Category.scss";
import Lightbox from "react-image-lightbox"; // use to zoom in image
import "react-image-lightbox/style.css";
import TableCategory from "./TableCategory";

class CU_Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImgURL: "",
      isOpen: false,

      id: "", // use to update
      name: "",
      image: "",
      action: "",
    };
  }

  async componentDidMount() {}

  //render => didupdate, so sánh this và prev
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listCategories !== this.props.listCategories) {
      //Khi tạo mới hoặc cập nhật xong thì set lại các giá trị
      this.setState({
        name: "",
        image: "",
        previewImgURL: "",
        action: CRUD_ACTIONS.CREATE, // cập nhật lại thành create category
      });
    }
  }

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];

    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      console.log("check base64 ", base64);
      console.log("check objectUrl ", objectUrl);
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

  handleCreateUpdateCategory = () => {
    let isValid = this.checkValidateInput();
    if (!isValid) return;

    let { action } = this.state;

    if (action === CRUD_ACTIONS.CREATE) {
      this.props.createCategory({
        name: this.state.name,
        image: this.state.image,
      });
    }

    if (action === CRUD_ACTIONS.EDIT) {
      this.props.updateCategory({
        id: this.state.id, //bắt buộc phải có để update
        name: this.state.name,
        image: this.state.image,
      });
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["name"];
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

  handleUpdateCategoryFromParent = (category) => {
    // chuyển đổi imageBase64
    let imageBase64 = "";
    if (category.image) {
      imageBase64 = new Buffer(category.image, "base64").toString("binary");
    }

    //Cập nhật state = category truyền vào từ child
    this.setState({
      id: category.id,
      name: category.name,
      image: "",
      previewImgURL: imageBase64,
      action: CRUD_ACTIONS.EDIT,
    });
  };

  render() {
    let language = this.props.language;
    let isLoading = this.props.isLoading;
    let { name, image } = this.state;

    return (
      <>
        <div className="redux_container">
          <div className="title text-center">Manage category by redux</div>
          <div>{isLoading === true ? "Loading" : ""}</div>
          <div className="user_redux_body">
            <div className="container">
              <div className="row">
                <div className="col-12 my-3">
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-category.edit" />
                  ) : (
                    <FormattedMessage id="manage-category.add" />
                  )}
                </div>
                <div className="col-6">
                  <label htmlFor="">
                    <FormattedMessage id="manage-category.name" />
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
                    <FormattedMessage id="manage-category.image" />
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
                    onClick={() => this.handleCreateUpdateCategory()}
                  >
                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                      <FormattedMessage id="manage-category.save-btn" />
                    ) : (
                      <FormattedMessage id="manage-category.create-btn" />
                    )}
                  </button>
                </div>
                <div className="col-12 mb-3">
                  <TableCategory
                    handleUpdateCategoryFromParent={
                      this.handleUpdateCategoryFromParent
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
    language: state.app.language,
    isLoading: state.admin.isLoading,
    listCategories: state.category.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCategory: (data) => dispatch(actions.createCategory(data)),

    fetchAllCategoriesStart: () => dispatch(actions.fetchAllCategoriesStart()),

    updateCategory: (data) => dispatch(actions.updateCategory(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CU_Category);
