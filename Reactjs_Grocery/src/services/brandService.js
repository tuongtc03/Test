import axios from "../axios";

const getAllBrands = (inputId) => {
  return axios.get(`/api/get-all-brands?id=${inputId}`);
};

const createBrandService = (data) => {
  return axios.post("/api/create-brand", data);
};

const deleteBrandService = (id) => {
  return axios.delete("/api/delete-brand", {
    data: {
      id: id,
    },
  });
};

const updateBrandService = (inputData) => {
  return axios.put("/api/update-brand", inputData);
};

export {
  getAllBrands,
  createBrandService,
  deleteBrandService,
  updateBrandService,
};
