import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux"; // use to connect react from redux
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils"; //use to gán giá trị thay đổi mỗi lần thực thi action
import * as actions from "../../../store/actions"; // phải import dòng này để kết nối đến redux fire một action
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox"; // use to zoom in image
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";

//CRUD User by Redux
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,

      id: "", // use to update
      userName: "",
      password: "",
      email: "",
      fullName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      roleId: "",
      image: "",
      action: "",
    };
  }

  async componentDidMount() {
    this.props.getGendersStart();
    this.props.getRolesStart();
  }

  //render => didupdate, so sánh this và prev
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders, // gán vào select option
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "", // gán giá trị mặc định
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        roleId: arrRoles && arrRoles.length > 0 ? arrRoles[1].keyMap : "",
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGenders = this.props.genderRedux;
      let arrRoles = this.props.roleRedux;

      //Khi tạo mới hoặc cập nhật xong thì set lại các giá trị
      this.setState({
        userName: "",
        password: "",
        email: "",
        fullName: "",
        phoneNumber: "",
        address: "",
        roleId: arrRoles && arrRoles.length > 0 ? arrRoles[1].keyMap : "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        image: "",
        previewImgURL: "",
        action: CRUD_ACTIONS.CREATE, // cập nhật lại thành create user
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

  handleCreateUpdateUser = () => {
    let isValid = this.checkValidateInput();
    if (!isValid) return;

    let { action } = this.state; // let action = this.state.action

    if (action === CRUD_ACTIONS.CREATE) {
      //fire redux create user
      this.props.createNewUser({
        userName: this.state.userName,
        password: this.state.password,
        fullName: this.state.fullName,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        address: this.state.address,
        gender: this.state.gender,
        roleId: this.state.roleId,
        image: this.state.image,
      });
    }

    if (action === CRUD_ACTIONS.EDIT) {
      //fire redux create user
      this.props.updateUserRedux({
        id: this.state.id, //bắt buộc phải có để update
        fullName: this.state.fullName,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        address: this.state.address,
        gender: this.state.gender,
        roleId: this.state.roleId,
        image: this.state.image,
      });
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "userName",
      "password",
      "email",
      "fullName",
      "phoneNumber",
      "address",
      "gender",
      "roleId",
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

  handleEditUserFromParent = (user) => {
    // chuyển đổi imageBase64
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }

    //Cập nhật state = user truyền vào từ child
    this.setState({
      id: user.id,
      userName: user.userName,
      password: "12345678",
      email: user.email,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      roleId: user.roleId,
      gender: user.gender,
      image: "",
      previewImgURL: imageBase64,
      action: CRUD_ACTIONS.EDIT,
    });
  };

  render() {
    console.log("check action ", this.state.action);
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let language = this.props.language;
    let isLoading = this.props.isLoading;
    let {
      userName,
      password,
      email,
      fullName,
      phoneNumber,
      address,
      gender,
      roleId,
      image,
    } = this.state;

    return (
      <>
        <div className="user_redux_container">
          <div className="title text-center">User Redux</div>
          <div>{isLoading === true ? "Loading" : ""}</div>
          <div className="user_redux_body">
            <div className="container">
              <div className="row">
                <div className="col-12 my-3">
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-user.edit" />
                  ) : (
                    <FormattedMessage id="manage-user.add" />
                  )}
                </div>
                <div className="col-2">
                  <label htmlFor="">
                    <FormattedMessage id="manage-user.userName" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={userName}
                    onChange={(event) => {
                      this.onChangeInput(event, "userName");
                    }}
                    disabled={this.state.action === CRUD_ACTIONS.EDIT}
                  />
                </div>
                <div className="col-2">
                  <label htmlFor="">
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(event) => {
                      this.onChangeInput(event, "password");
                    }}
                    disabled={this.state.action === CRUD_ACTIONS.EDIT}
                  />
                </div>
                <div className="col-3">
                  <label htmlFor="">
                    <FormattedMessage id="manage-user.fullName" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={fullName}
                    onChange={(event) => {
                      this.onChangeInput(event, "fullName");
                    }}
                  />
                </div>
                <div className="col-3">
                  <label htmlFor="">
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(event) => {
                      this.onChangeInput(event, "email");
                    }}
                  />
                </div>
                <div className="col-2">
                  <label htmlFor="">
                    <FormattedMessage id="manage-user.phoneNumber" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={phoneNumber}
                    onChange={(event) => {
                      this.onChangeInput(event, "phoneNumber");
                    }}
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="">
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={address}
                    onChange={(event) => {
                      this.onChangeInput(event, "address");
                    }}
                  />
                </div>
                <div className="col-2">
                  <label htmlFor="">
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select
                    id="inputState"
                    className="form-control"
                    onChange={(event) => {
                      this.onChangeInput(event, "gender");
                    }}
                    value={gender}
                  >
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.value_vi
                              : item.value_en}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-2">
                  <label htmlFor="">
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select
                    id="inputState"
                    className="form-control"
                    onChange={(event) => {
                      this.onChangeInput(event, "roleId");
                    }}
                    value={roleId}
                  >
                    {roles &&
                      roles.length > 0 &&
                      roles.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.value_vi
                              : item.value_en}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-2">
                  <label htmlFor="">
                    <FormattedMessage id="manage-user.image" />
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
                    onClick={() => this.handleCreateUpdateUser()}
                  >
                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                      <FormattedMessage id="manage-user.save-btn" />
                    ) : (
                      <FormattedMessage id="manage-user.create-btn" />
                    )}
                  </button>
                </div>
                <div className="col-12 mb-3">
                  <TableManageUser
                    handleEditUserFromParent={this.handleEditUserFromParent}
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
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    isLoading: state.admin.isLoading,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // Run actions first to check gender has exist
    getGendersStart: () => dispatch(actions.fetchGenderStart()),

    getRolesStart: () => dispatch(actions.fetchRoleStart()),

    createNewUser: (data) => dispatch(actions.createNewUser(data)),

    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),

    updateUserRedux: (data) => dispatch(actions.updateUser(data)),

    // changeLanguageAppRedux: (language) =>
    //   dispatch(actions.changeLanguageApp(language)),
    // processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
