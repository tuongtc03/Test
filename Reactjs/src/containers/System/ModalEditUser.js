import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"; // Use Modal
import _ from "lodash";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    /*Khai báo biến
    let: biến động
    const: biến tĩnh
    */
    this.state = {
      userName: "",
      password: "",
      email: "",
      fullName: "",
      address: "",
      phoneNumber: "",
      // gender: "",
      image: "",
      // roleId: "",
    };
  }

  componentDidMount() {
    console.log("check didmount: ", this.props.currentUser);
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        userName: user.userName,
        password: "hashPW",
        email: user.email,
        fullName: user.fullName,
        address: user.address,
        phoneNumber: user.phoneNumber,
        // gender: "",
        image: user.image,
        // roleId: "",
      });
    }
  }

  //Truyền đến parent để đóng / mở modal
  toggle = () => {
    this.props.toggleFromParent();
  };

  //Xử lý truyền value vào các biến trong state
  handleOnChangeInput = (event, id) => {
    //good code
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  //Kiểm tra các biến truyền vào có giống các biến được khai báo ở state không.
  checkValidate = () => {
    const arr = [
      "userName",
      "password",
      "email",
      "fullName",
      "address",
      "phoneNumber",
      // "gender",
      "image",
      // "roleId",
    ];
    //way 1:
    let checkData = true;
    for (let i = 0; i < arr.length; i++) {
      if (!this.state[arr[i]]) {
        checkData = false;
        alert("Missing parameters: " + arr[i]);
        break;
      }
    }
    return checkData;
  };

  //Xử lý lưu, truyền các biến trong state lên parent (UserManage)
  handleSaveUser = () => {
    let isValid = this.checkValidate();
    if (isValid === true) {
      //call api edit user modal
      this.props.editUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className="modal_container"
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
          className="modal_header"
        >
          Update user
        </ModalHeader>
        <ModalBody>
          <div className="modal_body">
            <div className="input_container">
              <label>Username</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "userName");
                }}
                value={this.state.userName}
                disabled
              />
            </div>
            <div className="input_container">
              <label>Password</label>
              <input
                type="password"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "password");
                }}
                value={this.state.password}
                disabled
              />
            </div>
            <div className="input_container">
              <label>Email</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "email");
                }}
                value={this.state.email}
              />
            </div>
            <div className="input_container">
              <label>Full name</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "fullName");
                }}
                value={this.state.fullName}
              />
            </div>
            <div className="input_container max_width_input">
              <label>Address</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "address");
                }}
                value={this.state.address}
              />
            </div>
            <div className="input_container">
              <label>Phone Number</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "phoneNumber");
                }}
                value={this.state.phoneNumber}
              />
            </div>
            <div className="input_container">
              <label>Gender</label>
              <select
                name="gender"
                className="form-control"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "gender");
                }}
              >
                <option value={this.state.gender}>Male</option>
                <option value={this.state.gender}>Female</option>
              </select>
            </div>
            <div className="input_container">
              <label>Image</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "image");
                }}
                value={this.state.image}
              />
            </div>
            <div className="input_container">
              <label>Role</label>
              <select
                name="roleId"
                className="form-control"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "roleId");
                }}
              >
                <option value={this.state.roleId}>Customer</option>
                <option value={this.state.roleId}>Admin</option>
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              this.toggle();
            }}
            className="px-3"
          >
            Close
          </Button>
          <Button
            color="primary"
            onClick={() => {
              this.handleSaveUser();
            }}
            className="px-3"
          >
            Save
          </Button>{" "}
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
