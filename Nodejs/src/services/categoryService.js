import db from "../models/index";

let getAllCategories = (categoryId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let categories = "";
      if (categoryId === "ALL") {
        categories = await db.Category.findAll({
          attributes: {},
        });
      }
      if (categoryId && categoryId !== "ALL") {
        categories = await db.Category.findOne({
          where: { id: categoryId },
          attributes: {},
        });
      }
      resolve(categories);
    } catch (e) {
      reject(e);
    }
  });
};

let checkName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let category = await db.Category.findOne({
        where: { name: name },
      });
      if (category) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
// Tạo mới category
let createCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //Kiểm tra name có tồn tại
      let check = await checkName(data.name);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Category is already used!",
        });
      } else {
        await db.Category.create({
          name: data.name,
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

// Cập nhật category
let updateCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      } // Tìm category trong db
      let category = await db.Category.findOne({
        where: { id: data.id },
        raw: false, // Chuyển sang object ở db
      });

      let check = await checkName(data.name);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Category is already used!",
        });
      } else {
        if (category) {
          // Tiến hành thay thế
          category.name = data.name;
          category.price = data.price;
          category.description = data.description;
          category.stockQuantity = data.stockQuantity;
          category.cateId = data.cateId;
          category.brandId = data.brandId;
          category.discountId = data.discountId;

          // Nếu data.image được truyền vào khác "" sẽ cập nhật image
          if (data.image) {
            category.image = data.image;
          }

          await category.save(); // Lưu lại

          resolve({
            errCode: 0,
            message: "Update the category succeeds!",
          });
        } else {
          resolve({
            errCode: 1,
            errMessage: `Category's not found!`,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Xóa category
let deleteCategory = (categoryId) => {
  return new Promise(async (resolve, reject) => {
    try {
      //Tìm category có id giống với id được truyền vào
      let category = await db.Category.findOne({
        where: { id: categoryId },
        raw: false, // Chuyển sang object của db
      });
      if (!category) {
        // Category không được tìm thấy
        resolve({
          errCode: 2,
          message: "The category isn't exist!",
        });
      }
      // Xóa category khỏi db
      await category.destroy();

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
  getAllCategories: getAllCategories,
  createCategory: createCategory,
  updateCategory: updateCategory,
  deleteCategory: deleteCategory,
};
