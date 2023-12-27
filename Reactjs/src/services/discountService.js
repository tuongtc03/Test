import axios from "../axios";

const getAllDiscounts = (inputId) => {
  return axios.get(`/api/get-all-discounts?id=${inputId}`);
};

const createDiscountService = (data) => {
  return axios.post("/api/create-discount", data);
};

const deleteDiscountService = (id) => {
  return axios.delete("/api/delete-discount", {
    data: {
      id: id,
    },
  });
};

const updateDiscountService = (inputData) => {
  return axios.put("/api/update-discount", inputData);
};

export {
  getAllDiscounts,
  createDiscountService,
  deleteDiscountService,
  updateDiscountService,
};
