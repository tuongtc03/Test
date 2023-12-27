import productService from "../services/productService";

let getTopProducts = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;

  try {
    let products = await productService.getTopProductsService(+limit);
    return res.status(200).json(products);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server.",
    });
  }
};

// Xử lý lấy tất cả products
let handleGetAllProducts = async (req, res) => {
  let id = req.query.id; //ALL, id

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      products: [],
    });
  }

  let products = await productService.getAllProducts(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    products,
  });
};

let handleCreateProduct = async (req, res) => {
  let message = await productService.createProduct(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleUpdateProduct = async (req, res) => {
  let data = req.body;
  let message = await productService.updateProduct(data);
  return res.status(200).json(message);
};

let handleDeleteProduct = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await productService.deleteProduct(req.body.id);
  return res.status(200).json(message);
};

let handleGetBrandsByCateId = async (req, res) => {
  let id = req.query.cateId;

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      brands: [],
    });
  }

  let brands = await productService.getBrandsByCateIdService(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    brands,
  });
};
module.exports = {
  getTopProducts: getTopProducts,
  handleGetAllProducts: handleGetAllProducts,
  handleCreateProduct: handleCreateProduct,
  handleUpdateProduct: handleUpdateProduct,
  handleDeleteProduct: handleDeleteProduct,
  handleGetBrandsByCateId: handleGetBrandsByCateId,
};
