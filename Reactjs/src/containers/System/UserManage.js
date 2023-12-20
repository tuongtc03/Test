import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService"; // Use Service gọi API
import ModalAddUser from "./ModalAddUser"; // Use Modal
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter"; // Use emitter
// Life cycle
// Run component:
// 1. Run constructor -> init state
// 2. Did mount (set state) : born ; unmount
// 3. Render (re-render)
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModelAddUser: false,
      isOpenModelEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersInManage();
  }

  //Lấy lại tất cả users trong db bằng cách gọi API sang Nodejs
  getAllUsersInManage = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };

  //Mở modal
  handleAddNewUser = () => {
    this.setState({
      isOpenModelAddUser: true,
    });
  };

  //Cập nhật đóng / mở modal
  toggleAddUserModal = () => {
    this.setState({
      isOpenModelAddUser: !this.state.isOpenModelAddUser,
    });
  };

  toggleEditUserModal = () => {
    this.setState({
      isOpenModelEditUser: !this.state.isOpenModelEditUser,
    });
  };
  //Xử lý tạo mới user, gửi data bằng cách gọi API sang Nodejs
  createNewUser = async (data) => {
    console.log("create new user ", data);
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersInManage(); //Gọi lại tất cả users
        this.setState({
          isOpenModelAddUser: false, //Đóng Modal khi tạo thành công
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA"); // Truyền sang child để đặt lại dữ liệu tạo mới
      }
    } catch (e) {
      console.log(e);
    }
  };

  //Xử lý khi nhấn vào button xóa
  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserService(user.id);
      if (res && res.errCode === 0) {
        await this.getAllUsersInManage(); // Khi xóa xong load lại Users
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //Xử lý khi nhấn vào button sửa
  handleEditUser = async (user) => {
    console.log("check edit ", user);
    this.setState({
      isOpenModelEditUser: true,
      userEdit: user,
    });
  };

  // Xử lý sửa user được truyền từ child -> parent
  doEditUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModelEditUser: false,
        });

        await this.getAllUsersInManage();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    console.log(" check render ", this.state);
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users_container">
        <ModalAddUser
          isOpen={this.state.isOpenModelAddUser}
          toggleFromParent={this.toggleAddUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModelEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModelEditUser}
            toggleFromParent={this.toggleEditUserModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
            // createNewUser={this.createNewUser}
          />
        )}
        <div className="title text-center">Manage users</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i> Add
          </button>
        </div>
        <div className="users_table mt-3 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>Full Name</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Gender</th>
                <th>Image</th>
                <th>Role</th>
                <th>Action</th>
              </tr>

              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>{item.email}</td>
                        <td>{item.fullName}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.address}</td>
                        <td>{item.gender.toString()}</td>
                        <td>{item.image}</td>
                        <td>{item.roleId}</td>
                        <td>
                          <button
                            className="btn_edit"
                            onClick={() => this.handleEditUser(item)}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="btn_delete"
                            onClick={() => this.handleDeleteUser(item)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
