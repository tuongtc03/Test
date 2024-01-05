import db from "../models/index";

let getAllDiscounts = (discountId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let discounts = "";
      if (discountId === "ALL") {
        discounts = await db.Discount.findAll({
          attributes: {},
        });
      }
      if (discountId && discountId !== "ALL") {
        discounts = await db.Discount.findOne({
          where: { id: discountId },
          attributes: {},
        });
      }
      resolve(discounts);
    } catch (e) {
      reject(e);
    }
  });
};

let checkName = (discountPercentage) => {
  return new Promise(async (resolve, reject) => {
    try {
      let discount = await db.Discount.findOne({
        where: { discountPercentage: discountPercentage },
      });
      if (discount) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Tạo mới discount
let createDiscount = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //Kiểm tra name có tồn tại
      let check = await checkName(data.discountPercentage);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Discount is already used!",
        });
      } else {
        await db.Discount.create({
          discountPercentage: data.discountPercentage,
          startDate: data.startDate,
          endDate: data.endDate,
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

// Cập nhật discount
let updateDiscount = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      } // Tìm discount trong db
      let discount = await db.Discount.findOne({
        where: { id: data.id },
        raw: false, // Chuyển sang object ở db
      });

        if (discount) {
          discount.discountPercentage = data.discountPercentage;
          discount.startDate = data.startDate;
          discount.endDate = data.endDate;

          await discount.save();

          resolve({
            errCode: 0,
            message: "Update the discount succeeds!",
          });
        } else {
          resolve({
            errCode: 1,
            errMessage: `Discount's not found!`,
          });
        }
      
    } catch (e) {
      reject(e);
    }
  });
};

// Xóa discount
let deleteDiscount = (discountId) => {
  return new Promise(async (resolve, reject) => {
    try {
      //Tìm discount có id giống với id được truyền vào
      let discount = await db.Discount.findOne({
        where: { id: discountId },
        raw: false, // Chuyển sang object của db
      });
      if (!discount) {
        resolve({
          errCode: 2,
          message: "The discount isn't exist!",
        });
      }
      // Xóa discount khỏi db
      await discount.destroy();

      resolve({
        errCode: 0,
        message: "Delete succeed!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  checkName: checkName,
  getAllDiscounts: getAllDiscounts,
  createDiscount: createDiscount,
  updateDiscount: updateDiscount,
  deleteDiscount: deleteDiscount,
};
