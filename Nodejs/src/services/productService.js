import db from "../models/index";

let getTopProductsService = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.Product.findAll({
        limit: limit,
        order: [["createdAt", "DESC"]],
        include: [
          { model: db.Category, as: "categoryData", attributes: ["name"] },
          { model: db.Brand, as: "brandData", attributes: ["name"] },
          {
            model: db.Discount,
            as: "discountData",
            attributes: ["discountPercentage"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: products,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let checkName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.Product.findOne({
        where: { name: name },
      });
      if (product) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllProducts = (productId) => { 
  return new Promise(async (resolve, reject) => {
    try {
      let products = "";
      if (productId === "ALL") {
        products = await db.Product.findAll({
          attributes: {},
        });
      }
      if (productId && productId !== "ALL") {
        products = await db.Product.findOne({
          where: { id: productId },
          attributes: {},
        });
      }
      resolve(products);
    } catch (e) {
      reject(e);
    }
  });
};

// Tạo mới product
let createProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkName(data.name);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Product is already used!",
        });
      } else {
        await db.Product.create({
          name: data.name,
          price: data.price,
          description: data.description,
          stockQuantity: data.stockQuantity,
          cateId: data.cateId,
          brandId: data.brandId,
          discountId: data.discountId,
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

// Cập nhật product
let updateProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      } // Tìm product trong db
      let product = await db.Product.findOne({
        where: { id: data.id },
        raw: false, // Chuyển sang object ở db
      });

      if (product) {
        product.name = data.name;
        product.price = data.price;
        product.description = data.description;
        product.stockQuantity = data.stockQuantity;
        product.cateId = data.cateId;
        product.brandId = data.brandId;
        product.discountId = data.discountId;

        if (data.image) {
          product.image = data.image;
        }

        await product.save();

        resolve({
          errCode: 0,
          message: "Update the product succeeds!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `Product's not found!`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.Product.findOne({
        where: { id: productId },
        raw: false, // Chuyển sang object của db
      });
      if (!product) {
        resolve({
          errCode: 2,
          message: "The product isn't exist!",
        });
      }

      await product.destroy();

      resolve({
        errCode: 0,
        message: "Delete succeed",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getBrandsByCateIdService = (cateId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!cateId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters!",
        });
      } else {
        let res = {};
        let brand = await db.Brand.findAll({
          where: { cateId: cateId },
          raw: true,
        });
        res.errCode = 0;
        res.data = brand;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getTopProductsService: getTopProductsService,
  checkName: checkName,
  getAllProducts: getAllProducts,
  createProduct: createProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getBrandsByCateIdService: getBrandsByCateIdService,
};
