import axios from "../axios";

const getAllOrders = (inputId) => {
  return axios.get(`/api/get-all-orders?id=${inputId}`);
};

const createOrderService = (data) => {
  return axios.post("/api/create-order", data);
};

const deleteOrderService = (id) => {
  return axios.delete("/api/delete-order", {
    data: {
      id: id,
    },
  });
};

const updateOrderService = (inputData) => {
  return axios.put("/api/update-order", inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

export {
  getAllOrders,
  createOrderService,
  deleteOrderService,
  updateOrderService,
  getAllCodeService,
};
