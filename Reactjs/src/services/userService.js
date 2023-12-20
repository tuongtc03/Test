import axios from "../axios";

//userService Reactjs dùng để gọi API sang userService Nodejs để xử lý

//Gọi API sang handleUserLogin
const handleLoginAPI = (userName, userPassword) => {
  return axios.post("/api/login", {
    userName: userName,
    password: userPassword,
  });
};

const getAllUsers = (inputId) => {
  //template string
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

//Gọi API sang createNewUser
const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (id) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: id,
    },
  });
};

const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};
//Nhớ export trước khi gọi API
export {
  handleLoginAPI,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
};
