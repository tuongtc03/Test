import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

//Mã hóa mật khẩu
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

// Xử lý đăng nhập
let handleUserLogin = (userName, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserName(userName);
      if (isExist) {
        //User đã tồn tại thì:
        let user = await db.User.findOne({
          where: { userName: userName },
          attributes: ["userName", "roleId", "password", "fullName"],
          raw: true, // chuyển thành object
        });
        if (user) {
          //So sánh mật khẩu
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = `Login is succeed`;
            delete user.password; // Xóa password khỏi API
            userData.user = user;
          } else {
            // Khi sai mật khẩu
            userData.errCode = 3;
            userData.errMessage = `Password is wrong`;
          }
        } else {
          //Double-check tài khoản trong db
          userData.errCode = 2;
          userData.errMessage = `User is not exist`;
        }
      } else {
        //Khi tài khoản ko tồn tại trong db
        userData.errCode = 1;
        userData.errMessage = `Your's username isn't exist in system. Pls try again`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

//Kiểm tra UserName có tồn tại hay không
let checkUserName = (userNameInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { userName: userNameInput },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Lấy tất cả người dùng trong db, userId là biến được gán trước khi truyền vào 'ALL' hoặc khác 'ALL'
let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"], // Ẩn password lên API
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"], // Ẩn password lên API
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

// Tạo mới user
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //Kiểm tra userName có tồn tại, nếu đã tồn tại thì hiển thị lỗi
      let check = await checkUserName(data.userName);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage:
            "Your username is already used, Pls try another username!",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password); // Mã hóa mật khẩu
        await db.User.create({
          userName: data.userName,
          password: hashPasswordFromBcrypt,
          email: data.email,
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          address: data.address,
          gender: data.gender,
          roleId: data.roleId,
          image: data.image,
        });
        resolve({
          errCode: 0,
          message: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Cập nhật user
let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.gender || !data.roleId) {
        //Kiểm tra id có tồn tại hay ko
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      } // Tìm user trong db
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false, // Chuyển sang object ở db
      });
      if (user) {
        user.fullName = data.fullName;
        user.email = data.email;
        user.phoneNumber = data.phoneNumber;
        user.address = data.address;
        user.gender = data.gender;
        user.roleId = data.roleId;

        if (data.image) {
          // Nếu data.image được truyền vào khác "" sẽ cập nhật image
          user.image = data.image;
        }

        await user.save(); // Lưu lại

        resolve({
          errCode: 0,
          message: "Update the user succeeds!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `User's not found!`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Xóa user
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      //Tìm user có id giống với id được truyền vào
      let user = await db.User.findOne({
        where: { id: userId },
        raw: false, // Chuyển sang object của db
      });
      if (!user) {
        // User không được tìm thấy
        resolve({
          errCode: 2,
          message: "The user isn't exist!",
        });
      }
      // Xóa user khỏi db
      await user.destroy();

      resolve({
        errCode: 0,
        message: "Delete succeed",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters!",
        });
      } else {
        let res = {};
        let allCode = await db.Allcode.findAll({
          where: { type: typeInput },
          raw: true,
        });
        res.errCode = 0;
        res.data = allCode;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getAllCodeService: getAllCodeService,
};
