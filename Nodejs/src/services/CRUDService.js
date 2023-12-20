import bcrypt from "bcryptjs";
import db from "../models/index";

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
          gender: data.gender === "1" ? true : false,
          image: data.image,
          roleId: data.roleId,
        });
        if (data.image) {
          data.image = Buffer.from(data.image, "base64").toString("binary");
        }
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

let getAllUsers = async () => {
  return new Promise((resolve, reject) => {
    try {
      let users = db.User.findAll();
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });

      if (user) {
        resolve(user);
      } else {
        resolve({});
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
      if (!data.id) {
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
        // Tiến hành thay thế
        user.fullName = data.fullName;
        user.email = data.email;
        user.phoneNumber = data.phoneNumber;
        user.address = data.address;
        user.gender = data.gender;
        user.roleId = data.roleId;

        if (data.image) {
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

module.exports = {
  createNewUser: createNewUser,
  getAllUsers: getAllUsers,
  getUserInfoById: getUserInfoById,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
