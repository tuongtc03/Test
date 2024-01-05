import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "../TableManage.scss";
import * as actions from "../../../store/actions"; // phải import dòng này để kết nối đến redux fire một action

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }

  componentDidMount = () => {
    this.props.fetchUserRedux();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        usersRedux: this.props.listUsers,
      });
    }
  }

  handleDeleteUser = (user) => {
    this.props.deleteUserRedux(user.id);
  };

  handleEditUser = (user) => {
    this.props.handleEditUserFromParent(user);
  };

  render() {
    let arrUsers = this.state.usersRedux;
    return (
      <div className="container_table">
        <table id="Table">
          <tbody>
            <tr>
              <th>
                <FormattedMessage id="manage-user.id" />
              </th>
              <th>
                <FormattedMessage id="manage-user.userName" />
              </th>
              <th>
                <FormattedMessage id="manage-user.fullName" />
              </th>
              <th>
                <FormattedMessage id="manage-user.email" />
              </th>
              <th>
                <FormattedMessage id="manage-user.phoneNumber" />
              </th>
              <th>
                <FormattedMessage id="manage-user.address" />
              </th>
              <th>
                <FormattedMessage id="manage-user.gender" />
              </th>
              <th>
                <FormattedMessage id="manage-user.role" />
              </th>
              <th>
                <FormattedMessage id="manage-user.action" />
              </th>
            </tr>

            {arrUsers &&
              arrUsers.length > 0 &&
              arrUsers.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.userName}</td>
                    <td>{item.fullName}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.address}</td>
                    <td>{item.gender}</td>
                    <td>{item.roleId}</td>

                    <td>
                      <button
                        className="btn_edit"
                        onClick={() => {
                          this.handleEditUser(item);
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn_delete ms-2"
                        onClick={() => {
                          this.handleDeleteUser(item);
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
    listUsers: state.admin.users, //users được khai bên admin là 1 mảng rỗng
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
