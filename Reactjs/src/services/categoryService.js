import axios from "../axios";

const getAllCategories = (inputId) => {
  return axios.get(`/api/get-all-categories?id=${inputId}`);
};

const createCategoryService = (data) => {
  return axios.post("/api/create-category", data);
};

const deleteCategoryService = (id) => {
  return axios.delete("/api/delete-category", {
    data: {
      id: id,
    },
  });
};

const updateCategoryService = (inputData) => {
  return axios.put("/api/update-category", inputData);
};

//Nhớ export trước khi gọi API
export {
  getAllCategories,
  createCategoryService,
  deleteCategoryService,
  updateCategoryService,
};
