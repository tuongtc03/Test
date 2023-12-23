import actionTypes from "./actionTypes";
import { toast } from "react-toastify";

import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  updateUserService,
} from "../../services/userService"; // Nhớ import hàm từ Service để thực thi get api bằng redux

// start doing end

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_START_LOADING,
      });
      //Gọi hàm từ userService để lấy AllCode với Type là gender
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        // Nếu true đi tiếp hàm success với biến truyền vào
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderStart error ", e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_START_LOADING,
      });
      //Gọi hàm từ userService để lấy AllCode với Type là ROLE
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        // Nếu true đi tiếp hàm success với biến truyền vào
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log("fetchRoleStart error ", e);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        // toast.success("Create a new user succeed!");
        toast.success("Tạo mới người dùng thành công!");
        dispatch(createNewUserSuccess());
        dispatch(fetchAllUsersStart()); // Khi tạo mới xong sẽ gọi all users
      } else {
        toast.error("Tạo mới người dùng thất bại!");
        dispatch(createNewUserFailed());
      }
    } catch (e) {
      toast.error("Tạo mới người dùng thất bại!");
      dispatch(createNewUserFailed());
      console.log("createNewUserFailed error ", e);
    }
  };
};

export const createNewUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const createNewUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_START_LOADING,
      });
      //Gọi hàm từ userService để lấy AllCode với Type là ROLE
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        // Nếu true đi tiếp hàm success với biến truyền vào
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        toast.error("Lấy tất cả người dùng thất bại!");
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      toast.error("Lấy tất cả người dùng thất bại!");
      dispatch(fetchAllUsersFailed());
      console.log("fetchAllUsersStart error ", e);
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      console.log("check deleteUser redux act: ", res);
      if (res && res.errCode === 0) {
        // toast.success("Create a new user succeed!");
        toast.success("Xóa người dùng thành công!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart()); // Khi tạo mới xong sẽ gọi all users
      } else {
        toast.error("Xóa người dùng thất bại!");
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      toast.error("Xóa người dùng thất bại!");
      dispatch(deleteUserFailed());
      console.log("deleteUser error ", e);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const updateUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await updateUserService(data);
      console.log("check edit user redux act: ", res);
      if (res && res.errCode === 0) {
        // toast.success("Create a new user succeed!");
        toast.success("Cập nhật người dùng thành công!");
        dispatch(updateUserSuccess());
        dispatch(fetchAllUsersStart()); // Khi tạo mới xong sẽ gọi all users
      } else {
        toast.error("Cập nhật người dùng thất bại!");
        dispatch(updateUserFailed());
      }
    } catch (e) {
      toast.error("Cập nhật người dùng thất bại!");
      dispatch(updateUserFailed());
      console.log("editUser error ", e);
    }
  };
};

export const updateUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const updateUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});
