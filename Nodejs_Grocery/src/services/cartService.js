import db from "../models/index";

let getAllCarts = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let carts = "";
      if (id === "ALL") {
        carts = await db.Cart.findAll({
          attributes: {},
          include: [
            {
              model: db.User,
              as: "userData",
              attributes: ["id", "fullName", "phoneNumber"],
            },
            {
              model: db.Product,
              as: "productData",
              attributes: ["name", "price"],
            },
          ],
        });
      }
      if (id && id !== "ALL") {
        carts = await db.Cart.findOne({
          where: { id: id },
          attributes: {},
          include: [
            {
              model: db.User,
              as: "userData",
              attributes: ["id", "fullName", "phoneNumber"],
            },
            {
              model: db.Product,
              as: "productData",
              attributes: ["name", "price"],
            },
          ],
        });
      }
      resolve(carts);
    } catch (e) {
      reject(e);
    }
  });
};

let checkCart = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await db.Cart.findOne({
        where: { userId: data.userId, productId: data.productId },
      });
      if (cart) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Tạo mới cart
let createCart = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkCart(data);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Cart is already used!",
        });
      } else {
        await db.Cart.create({
          userId: data.userId,
          productId: data.productId,
          quantity: data.quantity,
          subtotalPrice: data.subtotalPrice,
          totalPrice: data.totalPrice,
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

// Cập nhật cart
let updateCart = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      }
      let cart = await db.Cart.findOne({
        where: { id: data.id },
        raw: false, // Chuyển sang object ở db
      });

      if (cart) {
        cart.quantity = data.quantity;
        cart.subtotalPrice = data.subtotalPrice;
        cart.totalPrice = data.totalPrice;

        await cart.save();

        resolve({
          errCode: 0,
          message: "Update the cart succeeds!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `Cart's not found!`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Xóa cart
let deleteCart = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await db.Cart.findOne({
        where: { id: id },
        raw: false, // Chuyển sang object của db
      });
      if (!cart) {
        resolve({
          errCode: 2,
          message: "The cart isn't exist!",
        });
      } else {
        await cart.destroy();

        resolve({
          errCode: 0,
          message: "Delete succeed!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllCarts: getAllCarts,
  createCart: createCart,
  updateCart: updateCart,
  deleteCart: deleteCart,
};
