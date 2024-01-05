import axios from "../axios";

const getAllProducts = (inputId) => {
  return axios.get(`/api/get-all-products?id=${inputId}`);
};

//Gọi API sang createNewUser
const createProductService = (data) => {
  return axios.post("/api/create-product", data);
};

const deleteProductService = (id) => {
  return axios.delete("/api/delete-product", {
    data: {
      id: id,
    },
  });
};

const updateProductService = (inputData) => {
  return axios.put("/api/update-product", inputData);
};

const getBrandsByCateIdService = (id) => {
  return axios.get(`/api/get-brands-by-cateid?cateId=${id}`);
};

//Nhớ export trước khi gọi API
export {
  getAllProducts,
  createProductService,
  deleteProductService,
  updateProductService,
  getBrandsByCateIdService,
  
};
