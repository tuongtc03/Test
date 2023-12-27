import db from "../models/index";

let getAllBrands = (brandId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let brands = "";
      if (brandId === "ALL") {
        brands = await db.Brand.findAll({
          attributes: {},
        });
      }
      if (brandId && brandId !== "ALL") {
        brands = await db.Brand.findOne({
          where: { id: brandId },
          attributes: {},
        });
      }
      resolve(brands);
    } catch (e) {
      reject(e);
    }
  });
};

let checkName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let brand = await db.Brand.findOne({
        where: { name: name },
      });
      if (brand) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
// Tạo mới brand
let createBrand = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //Kiểm tra name có tồn tại
      let check = await checkName(data.name);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Brand is already used!",
        });
      } else {
        await db.Brand.create({
          name: data.name,
          cateId: data.cateId,
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

// Cập nhật brand
let updateBrand = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      } // Tìm brand trong db
      let brand = await db.Brand.findOne({
        where: { id: data.id },
        raw: false, // Chuyển sang object ở db
      });

      if (brand) {
        brand.name = data.name;
        brand.cateId = data.cateId;

        if (data.image) {
          brand.image = data.image;
        }

        await brand.save();

        resolve({
          errCode: 0,
          message: "Update the brand succeeds!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `Brand's not found!`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Xóa brand
let deleteBrand = (brandId) => {
  return new Promise(async (resolve, reject) => {
    try {
      //Tìm brand có id giống với id được truyền vào
      let brand = await db.Brand.findOne({
        where: { id: brandId },
        raw: false, // Chuyển sang object của db
      });
      if (!brand) {
        // Brand không được tìm thấy
        resolve({
          errCode: 2,
          message: "The brand isn't exist!",
        });
      }
      // Xóa brand khỏi db
      await brand.destroy();

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
  getAllBrands: getAllBrands,
  createBrand: createBrand,
  updateBrand: updateBrand,
  deleteBrand: deleteBrand,
};
