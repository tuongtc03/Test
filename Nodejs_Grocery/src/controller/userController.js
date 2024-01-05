import userService from "../services/userService";
// Dùng để test API

// Xử lý đăng ký
let handleSignup = async (req, res) => {
  let message = await userService.handleUserSignup(req.body);
  return res.status(200).json(message);
};

// Xử lý đăng nhập
let handleLogin = async (req, res) => {
  let userName = req.body.userName; // Lấy email từ API
  let password = req.body.password;

  if (!userName || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  //Gọi handleUserLogin từ userService để xử lý
  let userData = await userService.handleUserLogin(userName, password);
  //JWT: json web token
  return res.status(200).json({
    // Trả về dữ liệu theo như dữ liệu của userData
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

// Xử lý lấy tất cả users
let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; //ALL, id

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }

  let users = await userService.getAllUsers(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};

let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};

let handleUpdateUser = async (req, res) => {
  let message = await userService.updateUser(req.body);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Get all code error: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!",
    });
  }
};

module.exports = {
  handleSignup: handleSignup,
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleUpdateUser: handleUpdateUser,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
};
