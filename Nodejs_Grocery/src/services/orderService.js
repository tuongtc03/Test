import db from "../models/index";

let getAllOrders = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let orders = "";
      if (id === "ALL") {
        orders = await db.Order.findAll({
          attributes: {},
          include: [
            {
              model: db.User,
              as: "orderUserData",
              attributes: ["id", "fullName", "phoneNumber", "address"],
            },
          ],
        });
      }
      if (id && id !== "ALL") {
        orders = await db.Order.findOne({
          where: { id: id },
          attributes: {},
          include: [
            {
              model: db.User,
              as: "orderUserData",
              attributes: ["id", "fullName", "phoneNumber", "address"],
            },
          ],
        });
      }
      resolve(orders);
    } catch (e) {
      reject(e);
    }
  });
};

let createOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Order.create({
        userId: data.userId,
        receiver: data.receiver,
        totalPrice: data.totalPrice,
        addressDelivery: data.addressDelivery,
        paymentMethod: data.paymentMethod,
        note: data.note,
        status: "ST1",
      });

      resolve({
        errCode: 0,
        message: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updateOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      }
      let order = await db.Order.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (order) {
        order.status = data.status;

        await order.save();

        resolve({
          errCode: 0,
          message: "Update the order succeeds!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `Order's not found!`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = await db.Order.findOne({
        where: { id: id },
        raw: false,
      });
      if (!order) {
        resolve({
          errCode: 2,
          message: "The order isn't exist!",
        });
      }

      await order.destroy();

      resolve({
        errCode: 0,
        message: "Delete succeed!",
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
  getAllOrders: getAllOrders,
  createOrder: createOrder,
  updateOrder: updateOrder,
  deleteOrder: deleteOrder,
  getAllCodeService: getAllCodeService,
};
