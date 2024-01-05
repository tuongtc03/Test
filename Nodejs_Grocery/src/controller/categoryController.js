import categoryService from "../services/categoryService";

let handleGetAllCategories = async (req, res) => {
  let id = req.query.id; //ALL, id

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      categories: [],
    });
  }

  let categories = await categoryService.getAllCategories(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    categories,
  });
};

let handleCreateCategory = async (req, res) => {
  let message = await categoryService.createCategory(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleUpdateCategory = async (req, res) => {
  let data = req.body;
  let message = await categoryService.updateCategory(data);
  return res.status(200).json(message);
};

let handleDeleteCategory = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await categoryService.deleteCategory(req.body.id);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllCategories: handleGetAllCategories,
  handleCreateCategory: handleCreateCategory,
  handleUpdateCategory: handleUpdateCategory,
  handleDeleteCategory: handleDeleteCategory,
};
