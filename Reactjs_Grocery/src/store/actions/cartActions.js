import actionTypes from "./actionTypes";
import { toast } from "react-toastify";

import {
  getAllProducts,
  createProductService,
  deleteProductService,
  updateProductService,
  getBrandsByCateIdService,
} from "../../services/cartService"; // Nhớ import hàm từ Service để thực thi get api bằng redux

export const createProduct = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createProductService(data);
      if (res && res.errCode === 0) {
        toast.success("Tạo mới sản phẩm thành công!");
        dispatch(createProductSuccess());
        dispatch(fetchAllProductsStart());
      } else {
        toast.error("Tạo mới sản phẩm thất bại!");
        dispatch(createProductFailed());
      }
    } catch (e) {
      toast.error("Tạo mới sản phẩm thất bại!");
      dispatch(createProductFailed());
      console.log("createProductFailed error ", e);
    }
  };
};

export const createProductSuccess = () => ({
  type: actionTypes.CREATE_PRODUCT_SUCCESS,
});

export const createProductFailed = () => ({
  type: actionTypes.CREATE_PRODUCT_FAILED,
});

export const fetchAllProductsStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_START_LOADING,
      });
      let res = await getAllProducts("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllProductsSuccess(res.products.reverse()));
      } else {
        toast.error("Lấy tất cả sản phẩm thất bại!");
        dispatch(fetchAllProductsFailed());
      }
    } catch (e) {
      toast.error("Lấy tất cả sản phẩm thất bại!");
      dispatch(fetchAllProductsFailed());
      console.log("fetchAllProductsStart error ", e);
    }
  };
};

export const fetchAllProductsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_PRODUCTS_SUCCESS,
  products: data,
});

export const fetchAllProductsFailed = () => ({
  type: actionTypes.FETCH_ALL_PRODUCTS_FAILED,
});

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteProductService(productId);
      if (res && res.errCode === 0) {
        toast.success("Xóa sản phẩm thành công!");
        dispatch(deleteProductSuccess());
        dispatch(fetchAllProductsStart());
      } else {
        toast.error("Xóa sản phẩm thất bại!");
        dispatch(deleteProductFailed());
      }
    } catch (e) {
      toast.error("Xóa sản phẩm thất bại!");
      dispatch(deleteProductFailed());
      console.log("deleteProduct error ", e);
    }
  };
};

export const deleteProductSuccess = () => ({
  type: actionTypes.DELETE_PRODUCT_SUCCESS,
});

export const deleteProductFailed = () => ({
  type: actionTypes.DELETE_PRODUCT_FAILED,
});

export const updateProduct = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await updateProductService(data);
      if (res && res.errCode === 0) {
        toast.success("Cập nhật sản phẩm thành công!");
        dispatch(updateProductSuccess());
        dispatch(fetchAllProductsStart());
      } else {
        toast.error("Cập nhật sản phẩm thất bại!");
        dispatch(updateProductFailed());
      }
    } catch (e) {
      toast.error("Cập nhật sản phẩm thất bại!");
      dispatch(updateProductFailed());
      console.log("updateProduct error ", e);
    }
  };
};

export const updateProductSuccess = () => ({
  type: actionTypes.EDIT_PRODUCT_SUCCESS,
});

export const updateProductFailed = () => ({
  type: actionTypes.EDIT_PRODUCT_FAILED,
});

export const fetchBrandsByCateId = (cateId) => {
  return async (dispatch, getState) => {
    try {
      console.log("check cate id ", cateId);
      let res = await getBrandsByCateIdService(cateId);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_BRANDS_BY_CATEID_SUCCESS,
          brands: res.brands.data,
        });
        dispatch(fetchAllProductsStart());
      } else {
        dispatch(fetchBrandsByCateIdFailed());
      }
    } catch (e) {
      dispatch(fetchBrandsByCateIdFailed());
      console.log("deleteProduct error ", e);
    }
  };
};

export const fetchBrandsByCateIdFailed = () => ({
  type: actionTypes.FETCH_BRANDS_BY_CATEID_FAILED,
});
