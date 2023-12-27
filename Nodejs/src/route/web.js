import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
import categoryController from "../controller/categoryController";
import brandController from "../controller/brandController";
import discountController from "../controller/discountController";
import productController from "../controller/productController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/crud", homeController.getCRUD); // FILL CREATE

  router.post("/post-crud", homeController.postCRUD); // POST CREATE

  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);

  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  //api User
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/update-user", userController.handleUpdateUser);
  router.delete("/api/delete-user", userController.handleDeleteUser); //restAPI

  //api AllCode
  router.get("/api/allcode", userController.getAllCode);

  //api Category
  router.get(
    "/api/get-all-categories",
    categoryController.handleGetAllCategories
  );
  router.post("/api/create-category", categoryController.handleCreateCategory);
  router.put("/api/update-category", categoryController.handleUpdateCategory);
  router.delete(
    "/api/delete-category",
    categoryController.handleDeleteCategory
  );

  //api Brand
  router.get("/api/get-all-brands", brandController.handleGetAllBrands);
  router.post("/api/create-brand", brandController.handleCreateBrand);
  router.put("/api/update-brand", brandController.handleUpdateBrand);
  router.delete("/api/delete-brand", brandController.handleDeleteBrand);

  //api Discount
  router.get(
    "/api/get-all-discounts",
    discountController.handleGetAllDiscounts
  );
  router.post("/api/create-discount", discountController.handleCreateDiscount);
  router.put("/api/update-discount", discountController.handleUpdateDiscount);
  router.delete(
    "/api/delete-discount",
    discountController.handleDeleteDiscount
  );

  //api Product
  router.get("/api/top-products", productController.getTopProducts);
  router.get("/api/get-all-products", productController.handleGetAllProducts);
  router.post("/api/create-product", productController.handleCreateProduct);
  router.put("/api/update-product", productController.handleUpdateProduct);
  router.delete("/api/delete-product", productController.handleDeleteProduct);
  router.get(
    "/api/get-brands-by-cateid",
    productController.handleGetBrandsByCateId
  );

  return app.use("/", router);
};

module.exports = initWebRoutes;
